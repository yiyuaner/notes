# ClearBlue PSA Checker Development Guide

This document enables developers to write custom path-sensitive checkers using ClearBlue's PSA (Path-Sensitive Analysis) engine.

---

## 1. Conceptual Model: Symbolic Expression Graph (SEG)

The SEG is a per-function intermediate representation built from LLVM IR. It models **value flow** — how values propagate through computations, function calls, and memory operations.

### 1.1 Core Concepts

The SEG consists of two fundamental entity types:

- **Nodes** (`SEGNodeBase`): Represent values. Nodes are connected by parent/child edges denoting the direction of value flow (from parent to child).
- **Sites** (`SEGSiteBase`): Represent locations where values are *used* — loads, stores, calls, returns, comparisons, etc.

Together, they form a directed graph where a checker can trace how a value originating at a source propagates toward a sink.

### 1.2 Node Hierarchy

```
SEGObject (base of everything in the graph)
├── SEGNodeBase (values)
│   ├── SEGOperandNode (concrete operand values — the primary node type you interact with)
│   │   ├── SEGArgumentNode         — function parameters
│   │   │   ├── SEGCommonArgumentNode   (regular LLVM arguments)
│   │   │   ├── SEGPseudoArgumentNode   (inter-procedural abstractions)
│   │   │   └── SEGVarArgumentNode      (variadic arguments)
│   │   ├── SEGCallSiteOutputNode   — return value of a call site
│   │   │   ├── SEGCallSiteCommonOutputNode
│   │   │   └── SEGCallSitePseudoOutputNode
│   │   ├── SEGReturnNode           — function return values
│   │   ├── SEGLoadMemNode          — result of a load
│   │   ├── SEGStoreMemNode         — stored value
│   │   └── SEGPhiNode              — SSA phi nodes
│   └── SEGOpcodeNode (intermediate computations: casts, binary ops, GEP, etc.)
└── SEGSiteBase (use sites — see below)
```

### 1.3 Site Hierarchy

Sites mark where values are consumed:

```
SEGSiteBase
├── SEGCallSite          — function call (most important for inter-procedural analysis)
├── SEGReturnSite        — return instruction
└── SEGSimpleSite
    ├── SEGDereferenceSite — load/store (pointer dereference)
    ├── SEGCmpSite         — comparison
    ├── SEGDivSite         — division
    ├── SEGGEPSite         — getelementptr
    └── SEGAllocSite       — memory allocation
```

### 1.4 Key Relationships

- Each `SEGOperandNode` has an associated `SEGValue` (accessed via `getSEGValue()`), which wraps the underlying LLVM value and provides utility queries like `isPointerType()`, `isConstantPointerNull()`, `getFuncName()`, `isDerefPtr()`, etc.
- Each node tracks its **use sites** (where it is consumed): iterate with `use_site_begin()` / `use_site_end()`.
- Each node has **parents** (value sources) and **children** (value destinations): iterate with `parent_begin()`/`parent_end()` and `child_begin()`/`child_end()`.

### 1.5 Graph Iteration APIs (on `SymbolicExprGraph`)

| Iterator | What it yields |
|----------|---------------|
| `value_node_begin/end()` | All `Value* → SEGOperandNode*` mappings |
| `arg_begin/end()` | Function argument nodes |
| `seg_callsite_begin/end()` | All call sites |
| `inst_site_begin/end()` | All instruction sites |
| `return_begin/end()` | Return sites |

### 1.6 SEGCallSite APIs

`SEGCallSite` is the key site for inter-procedural reasoning:

| Method | Description |
|--------|-------------|
| `getCommonInput(size_t i)` | Get the i-th actual argument node |
| `getCommonOutput()` | Get the return value node |
| `getInputIndex(const SEGNodeBase*)` | Get the argument position of a given node |
| `getNumCommonInputs()` | Number of common inputs |
| `callee_begin/end()` | Iterate over potential callees |

### 1.7 SEGDereferenceSite APIs

| Method | Description |
|--------|-------------|
| `deref(const SEGOperandNode*)` | Returns true if the given node is the dereferenced pointer |
| `getPtrOperand()` | The pointer being dereferenced |
| `getValOperand()` | The value loaded/stored |
| `isLoad()` / `isStore()` | Type of dereference |

---

## 2. PSA Engine Overview

### 2.1 The Source-Sink Model

PSA detects **source-sink vulnerabilities**: bugs that arise when a value originating at a *source* flows (or fails to flow) to a *sink* along some program path.

There are three vulnerability categories:

| Category | Class to Extend | Semantics |
|----------|----------------|-----------|
| **SrcMustNotReachSink** | `SrcMustNotReachSinkVulnerability` | Bug if source value *can reach* sink (e.g., tainted input reaches SQL query) |
| **SrcMustReachSink** | `SrcMustReachSinkVulnerability` | Bug if source value does *not* reach sink on some path (e.g., allocated memory never freed) |
| **Taint** | `TaintStyleVulnerability` | Like MustNotReach, but source need not be a "fresh" value, and dereferenced pointers propagate taint |

### 2.2 How PSA Works

1. **SEG Construction**: For each function, LLVM IR is translated into a SEG.
2. **Source Collection**: The engine calls `setSources()` on your vulnerability to collect all `(node, site)` pairs that are sources.
3. **Bottom-Up DFS**: Starting from each source, the engine performs a depth-first search along value flow edges (node → children), visiting use sites along the way.
4. **Site Classification**: At each use site encountered, the engine calls `checkSite()` to determine if it's a sink, a call (for inter-procedural inlining), a return, or an ordinary site.
5. **Constraint Solving**: When a potential sink is reached, the engine collects path constraints and calls `setPrerequisites()` to add vulnerability-specific constraints (e.g., "pointer == null"). An SMT solver checks feasibility.
6. **Inter-Procedural Analysis**: At call sites, the engine uses function summaries to propagate analysis across function boundaries without re-analyzing callees from scratch.
7. **Reporting**: Feasible traces are reported as bugs.

### 2.3 The Trace

As the engine searches, it builds a `VulnerabilityTrace` — an ordered sequence of `SEGObject`s (alternating nodes and sites) representing the value flow path:

```
SourceNode → SourceSite → Node₁ → ... → CallSite → FormalArg → ... → ReturnSite → CallSiteOutput → ... → SinkSite
```

The `VulnerabilityTraceBuilder` (passed as `TraceHistory` in callbacks) lets you inspect the trace built so far:
- `recentObjAs<T>()` — the most recent object on the trace, cast to type T
- `sourceNode()` — the source node
- `sourceSite()` — the source site

---

## 3. Writing a Custom Checker

### 3.1 Which Base Class to Extend

For most user-defined checkers, extend one of:

- **`SrcMustNotReachSinkVulnerability`** — report if tainted/bad value reaches a dangerous site
- **`SrcMustReachSinkVulnerability`** — report if a value fails to reach a required site on some path
- **`TaintStyleVulnerability`** — for taint-tracking with propagation through pointer dereferences

These classes (inheriting from `SailFishVulnerability`) provide default implementations of `setSources()` and `checkSite()` that delegate to simpler `isSource()` / `isSink()` methods. This is the recommended approach.

### 3.2 Minimal Checker Template

```cpp
#include "Checker/PSA/Vulnerability.h"
#include "Checker/PSA/VulnerabilityRegistry.h"
#include "IR/SEG/SEGCallSite.h"
#include "IR/SEG/SEGSimpleSite.h"
#include "IR/SEG/SEGValue.h"

using namespace llvm;

class MyChecker : public SrcMustNotReachSinkVulnerability {
public:
  MyChecker() : SrcMustNotReachSinkVulnerability("MyChecker") {}

  // --- Required: define what constitutes a source ---
  bool isSource(SEGNodeBase *Node, SEGSiteBase *Site) override {
    // Return true if Node at Site is a source of the vulnerability
    return false;
  }

  // --- Required: define what constitutes a sink ---
  bool isSink(SEGNodeBase *Node, SEGSiteBase *Site) override {
    // Return true if Node at Site is a sink of the vulnerability
    return false;
  }

  // --- Optional: custom value transfer through calls ---
  void transfer(const SEGSiteBase *Site, const SEGNodeBase *Arg,
                std::vector<const SEGNodeBase *> &TransferDsts) override {
    // Add nodes that receive the tainted value from Arg at Site
  }
};

// Register the checker with a command-line flag and description
static VulnerabilityRegistry<MyChecker>
    X("ps-mychecker", "Description of my checker.", "ps-stable");
```

### 3.3 API Reference

#### `isSource(SEGNodeBase *Node, SEGSiteBase *Site) → bool`

Called by the default `setSources()` implementation for every `(node, site)` pair in the function. Return `true` if this node at this site is a source of the vulnerability.

- `Site` may be `nullptr` (the node has no use site, e.g., a constant or argument with no immediate use).
- Use `dyn_cast<SEGCallSite>(Site)` to check if the source is a call site return, then inspect the callee name via `Site->getSEGValue()->getFuncName()`.

#### `isSink(SEGNodeBase *Node, SEGSiteBase *Site) → bool`

Called during site classification. Return `true` if reaching this node at this site constitutes a bug.

Common patterns:
- **Dereference sink**: `dyn_cast<SEGDereferenceSite>(Site)` and check if it dereferences the tracked node.
- **Call argument sink**: `dyn_cast<SEGCallSite>(Site)` and check if the node flows into a dangerous argument position.

#### `transfer(const SEGSiteBase *Site, const SEGNodeBase *Arg, vector<const SEGNodeBase *> &TransferDsts)`

Defines custom value propagation through call sites. When the engine encounters `Arg` being passed to `Site` (a call), it invokes this to ask: "where does the tainted value go?"

Add destination nodes to `TransferDsts`. For example, if `memcpy(dst, src, n)` is called and `Arg` is `src`, you'd add `dst` and the return value to `TransferDsts`.

#### `setPrerequisites(SymbolicExprGraphSolver *Solver, const SEGSiteBase *CurrSite, const VulnerabilityTraceBuilder &TraceHistory, SMTExprVec &Prerequisites)`

Add SMT constraints that must be satisfiable for the bug to be real. For example, for NPD:

```cpp
void setPrerequisites(...) override {
  Prerequisites.push_back(
      Solver->getOrInsertExpr(TraceHistory.recentObjAs<SEGNodeBase>()) == 0);
}
```

This asserts the tracked pointer equals null. If the solver proves this is unsatisfiable, the trace is discarded.

**If your checker has no additional constraints**, implement an empty body.

#### `checkNode(const SEGNodeBase *CurrNode, const VulnerabilityTraceBuilder &TraceHistory) → bool`

Optional. Called during DFS to prune infeasible paths early. Return `true` to **stop** exploring beyond this node. Default returns `false` (never prune).

#### `checkTrace(shared_ptr<VulnerabilityTrace> &Trace) → bool`

Optional. Called on a complete source-to-sink trace before reporting. Return `false` to suppress the report. Useful for post-hoc filtering.

#### `finalCheck(const VulnerabilityTraceBuilder &TraceHistory) → bool`

Optional. Final validation before reporting. Return `false` to suppress. Useful for checks that need the full trace context (e.g., must-happen-in-parallel for data races).

#### `ConstantCheck(const SymbolicExprGraph *SEG, list<shared_ptr<VulnerabilityTrace>> &AllTraces)`

Optional. Handle vulnerabilities involving non-pointer global variables or constants that PSA doesn't automatically track as sources/sinks. Construct traces manually and add to `AllTraces`.

#### `getAnalysisUsage(AnalysisUsage &AU)` / `initializeAnalysis(Pass *P)`

Optional. Declare and initialize LLVM analysis passes your checker depends on. Use standard LLVM `AU.addRequired<AnalysisName>()` pattern.

### 3.4 Registration

Register your checker using a static global:

```cpp
static VulnerabilityRegistry<MyChecker>
    X("command-line-flag", "Human-readable description.", "group-name");
```

- **First argument**: The command-line option to enable this checker (e.g., `-ps-mychecker`).
- **Second argument**: Description shown in `--help`.
- **Third argument** (optional): Group name. If a group option is enabled, all checkers in that group are enabled (e.g., `"ps-stable"`).

### 3.5 Practical Patterns

#### Identifying functions by name

```cpp
if (auto *CS = dyn_cast<SEGCallSite>(Site)) {
  std::string Name = demangle_function(Site->getSEGValue()->getFuncName());
  if (Name.find("dangerous_api") != std::string::npos) {
    // This call site involves the dangerous API
  }
}
```

#### Checking specific argument positions

```cpp
if (auto *CS = dyn_cast<SEGCallSite>(Site)) {
  size_t idx = CS->getInputIndex(Node);
  if (idx == 0) {  // first argument
    return true;
  }
}
```

#### Tracking value through a wrapper function

```cpp
void transfer(const SEGSiteBase *Site, const SEGNodeBase *Arg,
              std::vector<const SEGNodeBase *> &TransferDsts) override {
  if (auto *CS = dyn_cast<SEGCallSite>(Site)) {
    std::string Name = demangle_function(Site->getSEGValue()->getFuncName());
    if (Name.find("wrapper_func") != std::string::npos) {
      // Input arg 0 flows to the return value
      if (CS->getInputIndex(Arg) == 0) {
        TransferDsts.push_back(CS->getCommonOutput());
      }
    }
  }
}
```

#### Using dereference sites as sinks (classic NPD)

```cpp
bool isSink(SEGNodeBase *Node, SEGSiteBase *Site) override {
  if (auto *DS = dyn_cast<SEGDereferenceSite>(Site)) {
    if (auto *OpNode = dyn_cast<SEGOperandNode>(Node)) {
      return DS->deref(OpNode);
    }
  }
  return false;
}
```

### 3.6 Multi-Vulnerability Checkers

For bugs that require correlating multiple vulnerability traces (e.g., data races need a write in one thread and a read/write in another), use `MultiVulnerability`:

```cpp
class MyMultiVuln : public MultiVulnerability {
public:
  const char *getFullName() override { return "My Multi Vulnerability"; }
  const char *getAbbrName() override { return "MMV"; }

  void buildDependence() override {
    // Define how traces of sub-vulnerabilities relate
    // e.g., the tail of vuln 0's trace defines the head of vuln 1's trace
    auto V0 = get(0), V1 = get(1);
    GetTraceFunctionTy func = [](shared_ptr<VulnerabilityTrace> T) {
      return T->back();  // use the tail of V0's trace
    };
    insertHeadDependence(V0, V1, func);
  }
};

static MultiVulnerabilityRegistry<MyMultiVuln, SubVuln1, SubVuln2>
    Y("ps-multi", "Multi-vulnerability checker.", "ps-stable", "Stable checkers");
```

---

## 4. Summary Checklist for New Checker Authors

1. Choose the right base class (`SrcMustNotReachSinkVulnerability` for most cases).
2. Implement `isSource()` — what values/sites start the trace.
3. Implement `isSink()` — what values/sites end the trace and constitute a bug.
4. Optionally implement `transfer()` — custom propagation through library calls.
5. Optionally implement `setPrerequisites()` — SMT constraints for path feasibility.
6. Register with `VulnerabilityRegistry<YourClass>`.
7. Place your `.cpp` file in `userdef/`.

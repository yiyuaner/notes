# Panda IR Instruction Semantics

Based on the `instructions.yaml` file, here are the instructions defined in Panda IR with explanations and examples:

---

## 1. **CompareInst** (`Compare`)
**Signature:** `[d-bool, real, real]` — Takes two integer or reference values, produces a boolean result.

**Description:** Compares two values according to a condition code (e.g., `==`, `<`, `>`, etc.). For references, only equality (`CC_EQ`) is supported.

**Example:**
```
// ArkTS-like source:
if (a < b) { ... }

// Panda IR:
v2 = Compare(v0, v1, CC_LT)   // v2 = (v0 < v1) ? true : false
```

---

## 2. **CmpInst** (`Cmp`)
**Signature:** `[d-int, number, number]` — Takes two numbers (int or float), produces an integer (-1, 0, or 1).

**Description:** Three-way comparison like Java's `compareTo`. Returns:
- `-1` if first < second
- `0` if first == second
- `1` if first > second

**Example:**
```
// ArkTS-like source:
let result = a.compareTo(b)

// Panda IR:
v2 = Cmp(v0, v1)   // v2 = -1, 0, or 1
```

---

## 3. **CompareAnyTypeInst** (`CompareAnyType`)
**Signature:** `[d-bool, any]` — Takes a dynamic-typed value, produces a boolean.

**Description:** Checks if a dynamic value matches a specific type (used in dynamic languages like ArkTS).

**Example:**
```
// ArkTS-like source:
if (typeof x === "number") { ... }

// Panda IR:
v1 = CompareAnyType(v0, TYPE_NUMBER)  // v1 = true if v0 is a number
```

---

## 4. **CastAnyTypeValueInst** (`CastAnyTypeValue`)
**Signature:** `[d-real, any]` — Takes a dynamic value, produces a concrete-typed value.

**Description:** Extracts a statically-typed value from a dynamic (`any`) type.

**Example:**
```
// ArkTS-like source:
let num: number = x as number  // x is 'any'

// Panda IR:
v1 = CastAnyTypeValue(v0, TYPE_F64)  // Extract double from dynamic value
```

---

## 5. **CastValueToAnyTypeInst** (`CastValueToAnyType`)
**Signature:** `[d-any, real]` — Takes a concrete value, produces a dynamic value.

**Description:** Wraps a statically-typed value into a dynamic (`any`) type (boxing).

**Example:**
```
// ArkTS-like source:
let x: any = 42

// Panda IR:
v0 = Constant(42)
v1 = CastValueToAnyType(v0)  // Box integer into 'any'
```

---

## 6. **ConstantInst** (`Constant`)
**Signature:** `[d-i32-i64-f32-f64]` — Produces a constant value.

**Description:** Represents a literal constant (integer or float). Must reside in the start basic block.

**Example:**
```
// ArkTS-like source:
let x = 42
let y = 3.14

// Panda IR:
v0 = Constant(42)      // i32 constant
v1 = Constant(3.14)    // f64 constant
```

---

## 7. **ParameterInst** (`Parameter`)
**Signature:** `[d-real-any]` — Produces a method parameter value.

**Description:** Represents a formal parameter of the method. Must reside in the start basic block.

**Example:**
```
// ArkTS-like source:
function add(a: number, b: number): number { return a + b }

// Panda IR (at entry):
v0 = Parameter(0)   // First parameter 'a'
v1 = Parameter(1)   // Second parameter 'b'
```

---

## 8. **LoadFromPool** (`LoadString`)
**Signature:** `[d-ref, save_state]` — Produces a reference to a string.

**Description:** Loads a string literal from the constant pool. Can throw exceptions, requires SaveState.

**Example:**
```
// ArkTS-like source:
let msg = "Hello, World!"

// Panda IR:
ss = SaveState(...)
v0 = LoadString(ss, string_id=123)  // Load string from pool
```

---

## 9. **FixedInputsInst1** (`Return`)
**Signature:** `[real-any]` — Takes a value to return.

**Description:** Returns a value from the current method. Terminates the basic block.

**Example:**
```
// ArkTS-like source:
return x + y

// Panda IR:
v2 = Add(v0, v1)
Return(v2)
```

---

## 10. **IntrinsicInst** (`Intrinsic`)
**Signature:** `[d-real-void, real-dyn]` — Variable inputs, optional output.

**Description:** Directly calls runtime intrinsic functions (built-in operations provided by the runtime).

**Example:**
```
// ArkTS-like source:
console.log(x)

// Panda IR:
ss = SaveState(...)
Intrinsic.PRINT(ss, v0)   // Call print intrinsic
```

---

## 11. **PhiInst** (`Phi`)
**Signature:** `[d-real-ref, real-ref-dyn]` — Merges values from multiple control flow paths.

**Description:** SSA Phi function that selects a value based on which predecessor basic block was executed.

**Example:**
```
// ArkTS-like source:
let x = cond ? a : b

// Panda IR:
// BB1: branch on cond
// BB2: ... uses a
// BB3: ... uses b
// BB4 (merge):
v3 = Phi(v1 from BB2, v2 from BB3)
```

---

## 12. **SpillFillInst** (`SpillFill`)
**Signature:** `[]` — No operands.

**Description:** Pseudo instruction inserted by the register allocator to handle register spills/fills (saving to memory when registers run out).

**Example:**
```
// Not directly visible in source code
// Inserted by register allocator:
SpillFill: [r0 -> stack[0], stack[1] -> r1]
```

---

## 13. **SaveStateInst** (`SaveState`)
**Signature:** `[d-real-pseudo, real-dyn]` — Records live virtual registers.

**Description:** Captures the state of virtual registers before operations that might leave compiled code (calls, exceptions). Used for deoptimization and GC.

**Example:**
```
// Before any call or potentially-throwing instruction:
ss = SaveState(v0, v1, v2)  // Save live values
v3 = Call(ss, method, args...)
```

---

## 14. **IfInst** (`If`)
**Signature:** `[real, real]` — Takes two values to compare.

**Description:** Compares two values and jumps to a target basic block based on the condition.

**Example:**
```
// ArkTS-like source:
if (x < y) { ... } else { ... }

// Panda IR:
If(v0, v1, CC_LT)  // If v0 < v1, goto true_branch, else false_branch
```

---

## 15. **IfImmInst** (`IfImm`)
**Signature:** `[real]` — Takes one value, compares with an immediate.

**Description:** Compares a value with an immediate constant and jumps.

**Example:**
```
// ArkTS-like source:
if (x == 0) { ... }

// Panda IR:
IfImm(v0, 0, CC_EQ)  // If v0 == 0, goto true_branch
```

---

## 16. **TryInst** (`Try`)
**Signature:** `[]` — No operands.

**Description:** Pseudo instruction marking the start of a try-block for exception handling.

**Example:**
```
// ArkTS-like source:
try {
  riskyOperation()
} catch (e) { ... }

// Panda IR:
Try                     // Mark start of try region
  ... instructions ...
```

---

## 17. **CatchPhiInst** (`CatchPhi`)
**Signature:** `[d-real-ref, real-ref-dyn]` — Merges values at exception handlers.

**Description:** Similar to Phi but for exception handling. Defines values that were live at each throw point within a try-block.

**Example:**
```
// ArkTS-like source:
try {
  x = a          // might throw here, x = a
  y = b          // might throw here, x = a
  x = c          // might throw here, x = c
} catch (e) {
  use(x)         // which value does x have?
}

// Panda IR (in catch block):
v_x = CatchPhi(a from throw1, a from throw2, c from throw3)
```

---

## Summary Table

| Instruction | Purpose | Example Use |
|-------------|---------|-------------|
| `Compare` | Boolean comparison | `x < y` → bool |
| `Cmp` | Three-way comparison | Compare floats/ints → -1/0/1 |
| `CompareAnyType` | Dynamic type check | `typeof x === "number"` |
| `CastAnyTypeValue` | Unbox dynamic value | `x as number` |
| `CastValueToAnyType` | Box to dynamic | `any x = 42` |
| `Constant` | Literal value | `42`, `3.14` |
| `Parameter` | Function argument | `function(a, b)` |
| `LoadString` | String literal | `"Hello"` |
| `Return` | Return from function | `return x` |
| `Intrinsic` | Runtime call | `print()`, `typeof()` |
| `Phi` | SSA merge | Control flow merge |
| `SpillFill` | Register allocation | (compiler internal) |
| `SaveState` | GC/deopt support | Before calls |
| `If` | Conditional branch | `if (x < y)` |
| `IfImm` | Branch vs immediate | `if (x == 0)` |
| `Try` | Exception region | `try { }` |
| `CatchPhi` | Exception merge | Values at catch |

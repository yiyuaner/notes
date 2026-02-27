Now I have a comprehensive view of the test suite structure. Let me provide you with a detailed analysis and a curated list of ~100 representative test cases.

---

# Test262 ES2015 Test Suite Analysis

## Overview

This test suite contains **6,329 JavaScript test files** organized into **355 directories**. It's based on the official ECMA-262 Test Suite (Test262), specifically targeting ES2015 (ES6) features. The tests are organized into two major categories:

---

## Directory Structure & Categories

### 1. **`built-ins/`** - Standard Built-in Objects (Majority of Tests)

Tests for JavaScript's standard library - the built-in objects, their constructors, prototypes, and methods.

| Category | Description | Key Semantic Concepts |
|----------|-------------|----------------------|
| **Array** | Array constructor, static methods (`from`, `of`, `isArray`), prototype methods | Iteration, mutation, higher-order functions, sparse arrays |
| **ArrayBuffer** | Binary data buffer | Memory allocation, `byteLength`, `slice`, `Symbol.species` |
| **Atomics** | Shared memory atomic operations | Concurrent programming, `wait`, `notify`, `compareExchange` |
| **DataView** | Low-level binary data access | Endianness, typed access (`getInt32`, `setFloat64`) |
| **Function** | Function constructor and prototype | `apply`, `call`, `bind`, callable objects |
| **Object** | Object constructor and utilities | `fromEntries`, property descriptors |
| **Proxy** | Meta-programming intercession | Traps (`get`, `set`, `has`, `deleteProperty`, etc.), invariants |
| **RegExp** | Regular expressions | Flags (`dotAll`, `sticky`, `unicode`), `Symbol.matchAll` |
| **SharedArrayBuffer** | Shared memory between workers | Concurrent memory access |
| **String** | String primitives and wrapper | `toString`, `valueOf` |
| **Symbol** | Primitive symbols | Well-known symbols (`iterator`, `toStringTag`, `species`, etc.) |
| **TypedArray** | Typed array views | `Int8Array`, `Float64Array`, buffer views, iteration |
| **TypedArrayConstructors** | Constructor behaviors | Instantiation patterns, inheritance |
| **WeakMap** | Weak key-value collections | Weak references, garbage collection semantics |
| **WeakSet** | Weak value collections | Object-only members, non-enumerable |
| **WeakRef** | Weak references (newer) | Garbage collection observability |
| **FinalizationRegistry** | Cleanup callbacks | GC finalization |
| **decodeURI/encodeURI** | URI encoding | String encoding/decoding |

### 2. **`language/`** - Language Syntax & Semantics

Tests for JavaScript language constructs rather than built-in library.

| Category | Description | Key Semantic Concepts |
|----------|-------------|----------------------|
| **expressions/** | Expression evaluation | |
| ├─ `async-arrow-function` | `async () => {}` | Async/await, promises, arrow function binding |
| ├─ `async-function` | `async function(){}` | Async function expressions |
| └─ `generators` | Generator expressions | Iterator protocol, `yield` |
| **statements/** | Statement execution | |
| ├─ `async-function` | `async function name(){}` | Async declarations, error handling |
| ├─ `class` | Class declarations | Inheritance, `super`, prototypes |
| └─ `generators` | Generator declarations | Iterator protocol |
| **module-code/** | ES Modules | |
| ├─ `namespace/` | Module namespace objects | `import *`, namespace internal slots |
| └─ parse/early errors | Import/export syntax | Module syntax restrictions |

---

## Test File Naming Conventions

Understanding the naming helps identify what each test covers:

| Pattern | Meaning | Example |
|---------|---------|---------|
| `S15.x.x_Ay_Tz.js` | Legacy ECMAScript 3/5 spec reference | `S15.4.1_A3.1_T1.js` |
| `*-throws.js` | Expects an error | `null-undefined-input-throws.js` |
| `return-abrupt-*.js` | Tests abrupt completion handling | `return-abrupt-from-this.js` |
| `*-strict.js` | Strict mode behavior | `predicate-call-this-strict.js` |
| `*-cross-realm.js` | Cross-realm/iframe behavior | `Symbol.iterator/cross-realm.js` |
| `not-a-constructor.js` | Tests `[[Construct]]` absence | Cannot use `new` |
| `length.js` / `name.js` | Function property tests | `.length` and `.name` properties |
| `prop-desc.js` | Property descriptor tests | Configurability, enumerability |
| `trap-*.js` | Proxy trap behavior | Proxy handler methods |
| `*_FIXTURE.js` | Helper module (not a test) | Used by module tests |

---

## Semantic Categories of Tests

### A. **Type Coercion & Conversion**
- `toindex-byteoffset.js` - ToIndex abstract operation
- `return-abrupt-from-tonumber-*.js` - ToNumber coercion
- `symbol-object-create-null-depth-throws.js` - Symbol coercion

### B. **Error Conditions**
- `*-throws.js` files - Type errors, range errors
- `early-errors-*.js` - Syntax/parse-time errors
- `null-handler.js` - Revoked proxy handling

### C. **Property Descriptors & Attributes**
- `prop-desc.js` - Testing `{writable, enumerable, configurable}`
- `not-a-constructor.js` - `[[Construct]]` internal method
- `length.js`, `name.js` - Function properties

### D. **Prototype Chain & Inheritance**
- `proto.js` - Prototype linkage
- `prototype-from-newtarget.js` - `new.target` prototype
- `inherited.js` - Method inheritance

### E. **Iteration Protocol**
- `Symbol.iterator` - Iterator method
- `entries.js`, `keys.js`, `values.js` - Iterator factories
- `iterator-*.js` - Iterator behavior

### F. **Proxy Invariants**
- `trap-is-undefined.js` - Missing trap fallback
- `targetdesc-is-not-configurable.js` - Invariant enforcement
- `return-is-abrupt.js` - Trap error handling

### G. **Asynchronous Semantics**
- `await-*.js` - Await expression behavior
- `try-*-finally-*.js` - Async try/catch/finally
- `returns-promise.js` - Promise wrapping

### H. **Module Semantics**
- `instn-*.js` - Module instantiation
- `eval-*.js` - Module evaluation
- `namespace/internals/*.js` - Namespace object behavior

---

## Curated Study List (~100 Test Cases)

Here's a carefully selected list covering the breadth of JavaScript semantics:

### **1. Array Methods (10 files)**
```
built-ins/Array/prototype/find/predicate-call-parameters.js
built-ins/Array/prototype/find/return-found-value-predicate-result-is-true.js
built-ins/Array/prototype/map/length.js
built-ins/Array/prototype/reduce/reduce-empty-array-no-initial-throws.js
built-ins/Array/prototype/filter/predicate-call-this-strict.js
built-ins/Array/prototype/forEach/callbackfn-called.js
built-ins/Array/prototype/sort/comparefn-calls.js
built-ins/Array/prototype/flat/array-like-objects.js
built-ins/Array/prototype/includes/includes.js
built-ins/Array/from/iter-map-fn-this.js
```

### **2. Proxy Traps (15 files)**
```
built-ins/Proxy/get/call-parameters.js
built-ins/Proxy/get/trap-is-undefined.js
built-ins/Proxy/set/call-parameters.js
built-ins/Proxy/set/target-property-is-not-configurable-not-writable-not-equal-to-v.js
built-ins/Proxy/has/call-parameters.js
built-ins/Proxy/deleteProperty/targetdesc-is-not-configurable.js
built-ins/Proxy/defineProperty/call-parameters.js
built-ins/Proxy/getOwnPropertyDescriptor/call-parameters.js
built-ins/Proxy/getPrototypeOf/call-parameters.js
built-ins/Proxy/setPrototypeOf/call-parameters.js
built-ins/Proxy/ownKeys/call-parameters.js
built-ins/Proxy/isExtensible/return-is-different-from-target.js
built-ins/Proxy/preventExtensions/call-parameters.js
built-ins/Proxy/apply/call-parameters.js
built-ins/Proxy/construct/call-parameters.js
```

### **3. Symbol Well-Known Symbols (10 files)**
```
built-ins/Symbol/iterator/cross-realm.js
built-ins/Symbol/toStringTag/cross-realm.js
built-ins/Symbol/toPrimitive/cross-realm.js
built-ins/Symbol/species/cross-realm.js
built-ins/Symbol/hasInstance/cross-realm.js
built-ins/Symbol/isConcatSpreadable/cross-realm.js
built-ins/Symbol/match/cross-realm.js
built-ins/Symbol/replace/cross-realm.js
built-ins/Symbol/search/cross-realm.js
built-ins/Symbol/for/cross-realm.js
```

### **4. TypedArray & Binary Data (10 files)**
```
built-ins/TypedArray/prototype/set/set-values.js
built-ins/TypedArray/prototype/slice/slice.js
built-ins/TypedArray/prototype/subarray/subarray.js
built-ins/TypedArray/prototype/find/find.js
built-ins/TypedArray/prototype/fill/fill.js
built-ins/DataView/prototype/setInt8/set-values-return-undefined.js
built-ins/DataView/prototype/getFloat64/getFloat64.js
built-ins/ArrayBuffer/prototype/slice/species.js
built-ins/ArrayBuffer/init-zero.js
built-ins/SharedArrayBuffer/prototype/slice/slice.js
```

### **5. WeakMap/WeakSet/WeakRef (8 files)**
```
built-ins/WeakMap/prototype/set/set.js
built-ins/WeakMap/prototype/get/get.js
built-ins/WeakMap/prototype/has/has.js
built-ins/WeakMap/prototype/delete/delete.js
built-ins/WeakSet/prototype/add/add.js
built-ins/WeakSet/prototype/has/has.js
built-ins/WeakRef/prototype/deref/custom-this.js
built-ins/FinalizationRegistry/prototype/register/custom-this.js
```

### **6. Atomics (5 files)**
```
built-ins/Atomics/add/good-views.js
built-ins/Atomics/compareExchange/good-views.js
built-ins/Atomics/exchange/expected-return-value.js
built-ins/Atomics/wait/wait.js
built-ins/Atomics/notify/notify.js
```

### **7. RegExp (5 files)**
```
built-ins/RegExp/prototype/Symbol.matchAll/species-constructor.js
built-ins/RegExp/prototype/sticky/cross-realm.js
built-ins/RegExp/prototype/unicode/cross-realm.js
built-ins/RegExp/prototype/dotAll/cross-realm.js
built-ins/RegExpStringIteratorPrototype/next/next.js
```

### **8. Async Functions & Generators (12 files)**
```
language/statements/async-function/declaration-returns-promise.js
language/statements/async-function/evaluation-body-that-returns.js
language/statements/async-function/evaluation-body-that-throws.js
language/statements/async-function/try-throw-finally-return.js
language/statements/async-function/try-return-finally-throw.js
language/statements/async-function/await-as-identifier-reference.js
language/expressions/async-arrow-function/arrow-returns-promise.js
language/expressions/async-arrow-function/dflt-params-abrupt.js
language/statements/generators/default-proto.js
language/expressions/generators/default-proto.js
language/statements/async-function/dflt-params-rest.js
language/statements/async-function/early-errors-declaration-await-in-formals.js
```

### **9. Class & Inheritance (5 files)**
```
language/statements/class/subclass/builtin-objects/Proxy/no-prototype-throws.js
```
*(Note: The class directory is sparse in this subset; more would be in full test262)*

### **10. Module Semantics (15 files)**
```
language/module-code/instn-named-bndng-fun.js
language/module-code/instn-resolve-empty-export.js
language/module-code/eval-export-dflt-cls-anon.js
language/module-code/early-dup-export-decl.js
language/module-code/parse-err-yield.js
language/module-code/namespace/Symbol.toStringTag.js
language/module-code/namespace/internals/get-str-found-init.js
language/module-code/namespace/internals/get-str-update.js
language/module-code/namespace/internals/has-property-str-found-uninit.js
language/module-code/namespace/internals/set.js
language/module-code/namespace/internals/own-property-keys-sort.js
language/module-code/instn-star-props-circular.js
language/module-code/instn-iee-err-dflt-thru-star.js
language/module-code/early-undef-continue.js
language/module-code/privatename-not-valid-earlyerr-module-3.js
```

### **11. Function & Object Fundamentals (5 files)**
```
built-ins/Function/prototype/apply/this-not-callable-realm.js
built-ins/Object/fromEntries/from-iterable.js
built-ins/Array/S15.4.1_A3.1_T1.js
built-ins/Array/S15.4.2.1_A2.2_T1.js
built-ins/String/prototype/toString/toString.js
```

---

## Recommended Study Order

1. **Start with Array methods** - They demonstrate iteration, callbacks, and `this` binding
2. **Move to Proxy** - Understand meta-object protocol and invariants
3. **Study Symbol** - Learn well-known symbols and their roles
4. **Explore TypedArray/DataView** - Binary data handling
5. **Async/Generators** - Understand control flow and promises
6. **Module code** - Learn ES module semantics
7. **WeakMap/WeakRef** - Garbage collection and weak references

---

## Full Paths for the 100 Selected Files

For your convenience, here are the full paths (prefix: `/home/yguoaz/develop/arkcompiler/arkcompiler/ets_frontend/test262/data/test_es2015/`):

```
built-ins/Array/prototype/find/predicate-call-parameters.js
built-ins/Array/prototype/find/return-found-value-predicate-result-is-true.js
built-ins/Array/prototype/flat/array-like-objects.js
built-ins/Array/prototype/filter/call-with-boolean.js
built-ins/Array/prototype/forEach/length.js
built-ins/Array/prototype/reduce/return-abrupt-from-this.js
built-ins/Array/prototype/sort/length.js
built-ins/Array/prototype/includes/length.js
built-ins/Array/prototype/map/length.js
built-ins/Array/from/length.js
built-ins/Proxy/get/call-parameters.js
built-ins/Proxy

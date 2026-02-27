# Summary of IntrinsicInst Semantics in Panda IR

## 1. What is IntrinsicInst?

`IntrinsicInst` is an IR instruction in Panda IR that represents calls to runtime intrinsic functions. These are built-in operations that the compiler recognizes and can optimize specially.

**Source Location:** `/home/yguoaz/develop/arkcompiler/arkcompiler/runtime_core/compiler/optimizer/ir/inst.h` (lines 2511-2605)

Key class members:
- `IntrinsicId intrinsic_id_` - identifies which intrinsic this instruction represents
- `ArenaVector<uint32_t> *imms_` - immediate values for the intrinsic
- Methods: `GetIntrinsicId()`, `SetIntrinsicId()`, `GetImms()`, `AddImm()`, etc.

## 2. Intrinsic ID Definitions

There are **two categories** of intrinsics:

### A. Core Runtime Intrinsics (from intrinsics.yaml)

**Source:** `/home/yguoaz/develop/arkcompiler/arkcompiler/runtime_core/compiler/intrinsics.yaml`

**Template:** `/home/yguoaz/develop/arkcompiler/arkcompiler/runtime_core/compiler/optimizer/templates/intrinsics/intrinsics_enum.inl.erb`

| Category | Examples | Semantics |
|----------|----------|-----------|
| **Math Operations** | `MATH_ABS_I32`, `MATH_ABS_I64`, `MATH_ABS_F32`, `MATH_ABS_F64` | Absolute value for different types |
| | `MATH_SQRT_F32`, `MATH_SQRT_F64` | Square root |
| | `MATH_SIN_F64`, `MATH_COS_F64`, `MATH_TAN_F64` | Trigonometric functions |
| | `MATH_ASIN_F64`, `MATH_ACOS_F64`, `MATH_ATAN_F64` | Inverse trig functions |
| | `MATH_MIN_I32`, `MATH_MAX_I32`, `MATH_MIN_F64`, `MATH_MAX_F64` | Min/max operations |
| **IO Operations** | `IO_PRINT_STRING`, `IO_PRINT_I32`, `IO_PRINT_I64`, `IO_PRINT_F32`, `IO_PRINT_F64` | Print values to output |
| **System Operations** | `SYSTEM_EXIT`, `SYSTEM_NANOTIME` | System calls |
| **Object Operations** | `OBJECT_GET_CLASS` | Get object's class |
| **Library Calls** | `LIB_CALL_FMOD`, `LIB_CALL_FMODF`, `LIB_CALL_MEM_COPY` | C library function calls |

### B. ECMAScript Intrinsics (from isa.yaml)

**Source:** `/home/yguoaz/develop/arkcompiler/arkcompiler/runtime_core/isa/isa.yaml` (namespace: ecmascript)

**Template:** `/home/yguoaz/develop/arkcompiler/arkcompiler/runtime_core/compiler/optimizer/templates/ecma_intrinsics_enum.inl.erb`

**Included in:** `/home/yguoaz/develop/arkcompiler/arkcompiler/runtime_core/compiler/optimizer/ir/runtime_interface.h` (line 150)

| Category | Examples | Semantics |
|----------|----------|-----------|
| **Constant Loaders** | `LDNAN`, `LDINFINITY`, `LDUNDEFINED`, `LDNULL`, `LDTRUE`, `LDFALSE` | Load constant values |
| | `LDHOLE`, `LDSYMBOL`, `LDGLOBAL`, `LDFUNCTION` | Load special values |
| **Binary Operations** | `ADD2`, `SUB2`, `MUL2`, `DIV2`, `MOD2`, `EXP` | Arithmetic with dynamic types |
| | `EQ`, `NOTEQ`, `STRICTEQ`, `STRICTNOTEQ` | Equality comparisons |
| | `LESS`, `LESSEQ`, `GREATER`, `GREATEREQ` | Relational comparisons |
| | `SHL2`, `SHR2`, `ASHR2`, `AND2`, `OR2`, `XOR2` | Bitwise operations |
| **Unary Operations** | `NEG`, `NOT`, `INC`, `DEC` | Unary arithmetic/logic |
| | `TYPEOF`, `TONUMBER`, `TONUMERIC` | Type operations |
| **Property Access** | `LDOBJBYNAME`, `STOBJBYNAME` | Named property access |
| | `LDOBJBYVALUE`, `STOBJBYVALUE` | Computed property access |
| | `LDOBJBYINDEX`, `STOBJBYINDEX` | Index-based property access |
| | `LDGLOBALVAR`, `STGLOBALVAR` | Global variable access |
| | `LDSUPERBYNAME`, `STSUPERBYNAME` | Super property access |
| **Object Creation** | `CREATEEMPTYOBJECT`, `CREATEOBJECTWITHBUFFER` | Create objects |
| | `CREATEEMPTYARRAY`, `CREATEARRAYWITHBUFFER` | Create arrays |
| | `NEWOBJRANGE`, `NEWOBJAPPLY` | Instantiate objects |
| **Function Calls** | `CALLARG0`, `CALLARG1`, `CALLARGS2`, `CALLARGS3` | Call with 0-3 args |
| | `CALLRANGE`, `CALLAPPLY`, `CALLSPREAD` | Call with variable args |
| | `CALLTHIS0`, `CALLTHIS1`, `CALLTHIS2`, `CALLTHIS3` | Method calls |
| | `CALLTHISRANGE` | Method call with range |
| **Control Flow** | `RETURN`, `RETURNUNDEFINED` | Function return |
| | `THROW`, `THROWNOTEXISTS`, `THROWCONSTASSIGNMENT` | Exception throwing |
| | `ISTRUE`, `ISFALSE` | Boolean conversion |
| **Iterator/Generator** | `GETITERATOR`, `GETNEXTPROPNAME` | Iterator operations |
| | `CREATEITERRESULTOBJ`, `CLOSEITERATOR` | Iterator result handling |
| | `CREATEASYNCGENERATOROBJ`, `ASYNCGENERATORRESOLVE` | Async generator ops |
| **Module Operations** | `LDEXTERNALMODULEVAR`, `STMODULEVAR` | Module variable access |
| | `GETMODULENAMESPACE` | Module namespace access |
| **Class Operations** | `DEFINECLASSWITHBUFFER` | Class definition |
| | `LDSUPERBYVALUE`, `STSUPERBYVALUE` | Super value access |
| | `LDPRIVATEPROPERTY`, `STPRIVATEPROPERTY` | Private property access |
| **Lexical Environment** | `LDLEXVAR`, `STLEXVAR` | Lexical variable access |
| | `NEWLEXENV`, `NEWLEXENVWITHNAME` | Create lexical environment |
| | `POPLEXENV` | Pop lexical environment |
| **Debug/Profile** | `DEBUGGER` | Debugger breakpoint |
| | `GETPROPITERATOR` | Property iterator |

## 3. How IntrinsicInst is Built

The `IntrinsicId` enum is generated from templates:

```cpp
// From ecma_intrinsics_enum.inl.erb
enum class IntrinsicId {
% Panda.instructions.select{|x| x.namespace == "ecmascript"}.each do |insn|
    <%= insn.opcode.upcase %>,
% end
    COUNT,
};
```

For core intrinsics (from intrinsics_enum.inl.erb):
```cpp
enum class IntrinsicId {
% Compiler::intrinsics.select{ |x| !x.is_irtoc? }.each do |intrinsic|
    <%= intrinsic.entrypoint_name %>,
% end
    LIB_CALL_FMOD,
    LIB_CALL_FMODF,
    LIB_CALL_MEM_COPY,
#include "intrinsics_stub.inl.h"
    COUNT,

    // Irtoc intrinsics
% Compiler::intrinsics.select(&:is_irtoc?).each do |intrinsic|
    <%= intrinsic.entrypoint_name %>,
% end
};
```

## 4. Semantics Examples

### ECMAScript Binary Operation (ADD2)
```
// ArkTS: let c = a + b
v2 = Intrinsic.ADD2(v0, v1)  // Dynamic addition with type coercion
```

### Property Access (LDOBJBYNAME)
```
// ArkTS: let x = obj.property
v1 = Intrinsic.LDOBJBYNAME(v0, "property")  // Load named property
```

### Function Call (CALLARG1)
```
// ArkTS: foo(arg)
v2 = Intrinsic.CALLARG1(v0, v1)  // Call function v0 with argument v1
```

### Object Creation (CREATEEMPTYOBJECT)
```
// ArkTS: let obj = {}
v0 = Intrinsic.CREATEEMPTYOBJECT()  // Create empty object
```

## 5. Intrinsic Flags and Properties

From intrinsics.yaml, intrinsics can have:
- `static: true/false` - Whether it's a static call
- `signature` - Parameter and return types
- `impl` - Implementation function name
- `codegen_func` - Code generation function
- `clear_flags` / `set_flags` - Optimization flags
- `need_nullcheck: true/false` - Whether null check is needed

## 6. Key Source Files

| File | Purpose |
|------|---------|
| `runtime_core/compiler/optimizer/ir/inst.h` | IntrinsicInst class definition |
| `runtime_core/compiler/intrinsics.yaml` | Core runtime intrinsic definitions |
| `runtime_core/isa/isa.yaml` | ECMAScript bytecode instruction definitions |
| `runtime_core/compiler/optimizer/ir/runtime_interface.h` | RuntimeInterface with IntrinsicId |
| `runtime_core/compiler/optimizer/templates/ecma_intrinsics_enum.inl.erb` | ECMAScript intrinsic enum template |
| `runtime_core/compiler/optimizer/templates/intrinsics/intrinsics_enum.inl.erb` | Core intrinsic enum template |

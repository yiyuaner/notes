Based on my analysis of the libabckit codebase, I can now explain the difference between `ABCKIT_TARGET_ARK_TS_V1` and `ABCKIT_TARGET_ARK_TS_V2`:

## Summary

**`ABCKIT_TARGET_ARK_TS_V1`** and **`ABCKIT_TARGET_ARK_TS_V2`** represent two different compilation targets for ArkTS code, corresponding to **dynamic** and **static** abc file formats respectively.

## Key Differences

| Aspect | `ABCKIT_TARGET_ARK_TS_V1` | `ABCKIT_TARGET_ARK_TS_V2` |
|--------|---------------------------|---------------------------|
| **ABC Format** | Dynamic | Static |
| **Source** | ArkTS compiled via the mainline/dynamic pipeline | ArkTS compiled via the static pipeline (experimental) |
| **Runtime Namespace** | `panda::` (dynamic runtime) | `ark::` (static runtime) |
| **ISA** | `isa_dynamic.h` - intrinsic-based dynamic opcodes (e.g., `CALLTHIS0`, `LDGLOBALVAR`) | `isa_static.h` - statically-typed opcodes (e.g., `CALL_STATIC`, `LOADOBJECT`) |
| **IR Builder** | `libabckit::IrBuilderDynamic` | `ark::compiler::IrBuilder` |
| **Codegen** | `libabckit::CodeGenDynamic` | `libabckit::CodeGenStatic` |
| **Support Status** | Fully supported | **Experimental** |

## Technical Details

1. **File Format Detection**: When libabckit opens an abc file, it determines the target based on the source language metadata in the file:
   - `SourceLang::ARKTS` in dynamic files → `ABCKIT_TARGET_ARK_TS_V1`
   - Static abc files → `ABCKIT_TARGET_ARK_TS_V2`

2. **API Dispatch**: Throughout the codebase, APIs dispatch to different implementations based on the target:
   ```cpp
   switch (function->module->target) {
       case ABCKIT_TARGET_JS:
       case ABCKIT_TARGET_ARK_TS_V1:
           return FunctionGetNameDynamic(function);  // adapter_dynamic/
       case ABCKIT_TARGET_ARK_TS_V2:
           return FunctionGetNameStatic(function);   // adapter_static/
   }
   ```

3. **V2 (Static) has richer type information**: The static format includes:
   - Full type annotations
   - Interface and enum support
   - More explicit object/class operations
   - No dynamic property lookups

4. **V1 (Dynamic) uses intrinsics**: Almost all operations are converted to intrinsic calls (like `Intrinsic.callthis0`), reflecting the dynamic nature of JS/ArkTS.

In essence: **V1 is the "interpreted/dynamic" mode** (how JS/TS typically run), while **V2 is the "static/AOT-compiled" mode** for ArkTS that enables stronger optimizations but is still experimental.

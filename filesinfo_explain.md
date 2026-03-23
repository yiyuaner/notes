Explanation of filesInfo.rel.txt                                                             
                                                                                               
  The filesInfo.rel.txt file is a configuration file used by the ArkCompiler's es2abc tool to  
  specify source files and their metadata when compiling TypeScript/ArkTS code into bytecode   
  (.abc files). Each line in the file describes one source file with semicolon-separated       
  fields.                                                                                      
                                                                                               
  Format                                                                                       
                                                                                               
  filePath;recordName;moduleKind;sourceFile;pkgName;isSharedModule;sourceLang

  Example Breakdown

  Looking at your file:
  modules/entry/src/main/ets/entrybackupability/EntryBackupAbility.ts;&entry/src/main/ets/entry
  backupability/EntryBackupAbility&;esm;entry|entry|1.0.0|src/main/ets/entrybackupability/Entry
  BackupAbility.ts;entry;false;ets                                                             
   
  Field Index: 0                                                                               
  Field Name: filePath                                                                       
  Value: modules/entry/src/main/ets/entrybackupability/EntryBackupAbility.ts
  Description: The path to the intermediate TypeScript file
  ────────────────────────────────────────
  Field Index: 1
  Field Name: recordName
  Value: &entry/src/main/ets/entrybackupability/EntryBackupAbility&
  Description: A unique identifier for this module record in the merged ABC file. The &
    delimiters are used as markers.
  ────────────────────────────────────────
  Field Index: 2                                                                               
  Field Name: moduleKind
  Value: esm                                                                                   
  Description: The module system type. Values can be: esm (ES Module), commonjs (CommonJS), or
    script (plain script)
  ────────────────────────────────────────
  Field Index: 3
  Field Name: sourceFile
  Value: entry|entry|1.0.0|src/main/ets/entrybackupability/EntryBackupAbility.ts
  Description: Source file metadata using pipe-separated format:
    bundleName|moduleName|version|relativePath
  ────────────────────────────────────────
  Field Index: 4
  Field Name: pkgName
  Value: entry
  Description: The package/module name for this file
  ────────────────────────────────────────
  Field Index: 5
  Field Name: isSharedModule
  Value: false
  Description: Whether this is a shared module (for HSP - Harmony Shared Package)
  ────────────────────────────────────────
  Field Index: 6
  Field Name: sourceLang
  Value: ets
  Description: The original source language (ets for ArkTS, ts for TypeScript, js for
    JavaScript)

  Field Details

  1. filePath: Path to the intermediate TS file (relative or absolute depending on processing) 
  2. recordName: Used when --merge-abc flag is enabled. It identifies this module uniquely
  within the merged bytecode file. The & characters wrap the identifier.                       
  3. moduleKind: Determines how the file is parsed:                                          
    - esm → ES Modules (import/export)                                                         
    - commonjs → CommonJS (require/module.exports)
    - script → Plain JavaScript/TypeScript without module system                               
  4. sourceFile (pipe-separated):                                                            
    - entry - Bundle name (application package identifier)
    - entry - Module name (HAP/HSP module name)                                                
    - 1.0.0 - Version number
    - src/main/ets/... - Original source file path relative to module root                     
  5. pkgName: Package name, used for module resolution                                       
  6. isSharedModule: true/false - indicates if this module is part of a Harmony Shared Package 
  (HSP)
  7. sourceLang: Original language before any transformation - important for proper handling of
   ArkTS-specific features                                                                   

  Usage

  As shown in the README.md, this file is processed by es2abc:

  # Convert relative paths to absolute paths
  awk '{ print ENVIRON["APP_DIR"]"/"$0 }' filesInfo.rel.txt > filesInfo.txt

  # Compile to bytecode
  es2abc --module --merge-abc --enable-annotations --output app.abc @filesInfo.txt
                                                                                               
  The @ prefix tells es2abc to read the file list from the specified file rather than treating
  it as a single source file. 

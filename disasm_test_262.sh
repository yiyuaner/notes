#!/bin/bash

source /home/yguoaz/develop/arkcompiler/set_env.sh

ABC_DIR=/home/yguoaz/develop/arkcompiler/arkcompiler/ets_frontend/out

# Check if the directory exists to avoid errors
if [ ! -d "$ABC_DIR" ]; then
    echo "Error: Directory $ABC_DIR does not exist."
    exit 1
fi

# Find all .abc files recursively and process them
find "$ABC_DIR" -type f -name "*.abc" | while read -r full_abc_path; do

    # Construct the .asm path by stripping the .abc extension and adding .asm
    full_asm_path="${full_abc_path%.abc}.asm"

    echo "Processing: $full_abc_path"
    echo "Output to:  $full_asm_path"

    # Execute the disassembler command
    # Ensure ark_disasm is in your PATH, or provide the absolute path to the executable
    ark_disasm --verbose "$full_abc_path" "$full_asm_path"

    echo "---------------------------------------------------"
done

echo "Disassembly complete."

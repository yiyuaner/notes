#!/bin/bash

# Check if an input file was provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_file> <output_file>"
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_FILE="$2"

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file '$INPUT_FILE' not found."
    exit 1
fi

# 1. Get the last line (tail -n 1)
# 2. Parse JSON (jq) to find message -> content[0] -> text
# 3. Save to output file
tail -n 1 "$INPUT_FILE" | jq -r '.message.content[0].text' > "$OUTPUT_FILE"

# Check if the operation was successful
if [ $? -eq 0 ]; then
    echo "Success! Extracted text written to $OUTPUT_FILE"
else
    echo "Error: Failed to extract JSON. Ensure the last line is valid JSON."
fi

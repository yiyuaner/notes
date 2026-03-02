/**
 * Test: Basic Module Import (Main file)
 * Demonstrates: importing named exports, default imports, aliased imports
 */

// Import default export
import MathUtils from "./01_basic_export_lib";

// Import named exports
import { PI, E, add, multiply, Calculator } from "./01_basic_export_lib";

// Import with alias
import { add as addition, multiply as mult } from "./01_basic_export_lib";

// Import type
import type { MathOperation, NumberPair } from "./01_basic_export_lib";

// Use imported constants
console.log(`PI = ${PI}`);
console.log(`E = ${E}`);

// Use imported functions
console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`multiply(4, 7) = ${multiply(4, 7)}`);

// Use aliased imports
console.log(`addition(10, 20) = ${addition(10, 20)}`);
console.log(`mult(6, 8) = ${mult(6, 8)}`);

// Use default import
console.log(`square(5) = ${MathUtils.square(5)}`);
console.log(`cube(3) = ${MathUtils.cube(3)}`);

// Use imported class
const calc = new Calculator();
const result = calc.add(10).add(5).subtract(3).getResult();
console.log(`Calculator result: ${result}`);

// Use imported type
const operation: MathOperation = {
    execute: (a, b) => a + b
};
console.log(`Operation: ${operation.execute(3, 4)}`);

const pair: NumberPair = [10, 20];
console.log(`Pair: ${pair}`);

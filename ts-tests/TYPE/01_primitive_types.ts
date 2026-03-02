/**
 * Test: Primitive Types
 * Demonstrates: number, string, boolean, undefined, null
 */

// Number type
const integer: number = 42;
const float: number = 3.14159;
const negative: number = -100;
const scientific: number = 1.5e10;
const hex: number = 0xff;
const octal: number = 0o755;
const binary: number = 0b1010;

console.log(`Integer: ${integer}`);
console.log(`Float: ${float}`);
console.log(`Negative: ${negative}`);
console.log(`Scientific: ${scientific}`);
console.log(`Hex: ${hex}`);
console.log(`Octal: ${octal}`);
console.log(`Binary: ${binary}`);

// Special number values
const infinity: number = Infinity;
const negInfinity: number = -Infinity;
const notANumber: number = NaN;

console.log(`Infinity: ${infinity}`);
console.log(`-Infinity: ${negInfinity}`);
console.log(`NaN: ${notANumber}`);
console.log(`Is NaN: ${Number.isNaN(notANumber)}`);
console.log(`Is Finite: ${Number.isFinite(100)}`);
console.log(`Is Finite (Infinity): ${Number.isFinite(infinity)}`);

// String type
const singleQuote: string = 'Hello';
const doubleQuote: string = "World";
const templateLiteral: string = `Value: ${integer}`;
const multiLine: string = `Line 1
Line 2
Line 3`;

console.log(`Single: ${singleQuote}`);
console.log(`Double: ${doubleQuote}`);
console.log(`Template: ${templateLiteral}`);
console.log(`Multi-line: ${multiLine}`);

// String operations
console.log(`Length: ${singleQuote.length}`);
console.log(`Upper: ${singleQuote.toUpperCase()}`);
console.log(`Concat: ${singleQuote + " " + doubleQuote}`);

// Boolean type
const trueValue: boolean = true;
const falseValue: boolean = false;
const comparison: boolean = 5 > 3;
const logical: boolean = trueValue && falseValue;

console.log(`True: ${trueValue}`);
console.log(`False: ${falseValue}`);
console.log(`5 > 3: ${comparison}`);
console.log(`true && false: ${logical}`);

// Undefined and Null
let undefinedVar: undefined = undefined;
let nullVar: null = null;
let maybeUndefined: string | undefined = undefined;
let maybeNull: string | null = null;

console.log(`Undefined: ${undefinedVar}`);
console.log(`Null: ${nullVar}`);
console.log(`undefined === null: ${undefinedVar === nullVar}`);
console.log(`undefined == null: ${undefinedVar == nullVar}`);

// Type checking
console.log(`typeof number: ${typeof integer}`);
console.log(`typeof string: ${typeof singleQuote}`);
console.log(`typeof boolean: ${typeof trueValue}`);
console.log(`typeof undefined: ${typeof undefinedVar}`);
console.log(`typeof null: ${typeof nullVar}`); // "object" (JavaScript quirk)

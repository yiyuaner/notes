/**
 * Test: Different Function Types
 * Demonstrates: regular functions, arrow functions, function expressions
 */

// Regular function declaration
function regularAdd(a: number, b: number): number {
    return a + b;
}

// Function expression
const expressionAdd = function(a: number, b: number): number {
    return a + b;
};

// Arrow function (concise body)
const arrowAdd = (a: number, b: number): number => a + b;

// Arrow function (block body)
const arrowAddBlock = (a: number, b: number): number => {
    const result = a + b;
    return result;
};

// Generic function
function identity<T>(value: T): T {
    return value;
}

// Function with optional parameter
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}

// Function with default parameter
function power(base: number, exponent: number = 2): number {
    return Math.pow(base, exponent);
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}

// Function overloads
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value * 2;
}

// Higher-order function
function applyOperation(
    a: number,
    b: number,
    operation: (x: number, y: number) => number
): number {
    return operation(a, b);
}

// Function returning function
function createGreeter(greeting: string): (name: string) => string {
    return (name: string) => `${greeting}, ${name}!`;
}

// Usage
console.log(`Regular: ${regularAdd(2, 3)}`);
console.log(`Expression: ${expressionAdd(2, 3)}`);
console.log(`Arrow: ${arrowAdd(2, 3)}`);
console.log(`Arrow block: ${arrowAddBlock(2, 3)}`);

console.log(`Identity string: ${identity("hello")}`);
console.log(`Identity number: ${identity(42)}`);

console.log(`Greet: ${greet("World")}`);
console.log(`Greet custom: ${greet("World", "Hi")}`);

console.log(`Power default: ${power(3)}`);
console.log(`Power custom: ${power(2, 10)}`);

console.log(`Sum: ${sum(1, 2, 3, 4, 5)}`);

console.log(`Process string: ${process("hello")}`);
console.log(`Process number: ${process(21)}`);

console.log(`Apply multiply: ${applyOperation(4, 5, (x, y) => x * y)}`);

const hiGreeter = createGreeter("Hi");
console.log(hiGreeter("TypeScript"));

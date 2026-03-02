/**
 * Test: Special Types
 * Demonstrates: any, unknown, void, never, union, intersection
 */

// Any type - opts out of type checking
let anyValue: any = 42;
anyValue = "now a string";
anyValue = { nested: { value: true } };
console.log(`Any value: ${anyValue.nested.value}`);

// Unknown type - type-safe alternative to any
let unknownValue: unknown = 42;
unknownValue = "now a string";

// Must check type before using unknown
if (typeof unknownValue === "string") {
    console.log(`Unknown as string: ${unknownValue.toUpperCase()}`);
}

if (typeof unknownValue === "number") {
    console.log(`Unknown as number: ${unknownValue * 2}`);
}

// Void type - absence of return value
function logMessage(msg: string): void {
    console.log(msg);
    // No return statement needed
}

const voidResult: void = logMessage("Hello void");
console.log(`Void result: ${voidResult}`); // undefined

// Never type - function that never returns
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // Never terminates
        break; // Added for practical testing
    }
    throw new Error("unreachable");
}

// Never in exhaustive checking
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI;
        case "square":
            return 4;
        case "triangle":
            return 3;
        default:
            // If we add a new shape and forget to handle it,
            // TypeScript will error here
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}

console.log(`Circle area unit: ${getArea("circle")}`);

// Union types
let id: string | number;
id = "abc123";
console.log(`ID as string: ${id}`);
id = 12345;
console.log(`ID as number: ${id}`);

function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    }
    return `ID-${id}`;
}

console.log(`Format string: ${formatId("abc")}`);
console.log(`Format number: ${formatId(123)}`);

// Intersection types
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const person: Person = {
    name: "Alice",
    age: 30
};
console.log(`Person: ${person.name}, ${person.age}`);

// Literal types
const direction: "north" | "south" | "east" | "west" = "north";
const status: 0 | 1 | -1 = 1;
const enabled: true = true;

console.log(`Direction: ${direction}`);
console.log(`Status: ${status}`);
console.log(`Enabled: ${enabled}`);

// Type assertions
const someValue: unknown = "hello world";
const strLength: number = (someValue as string).length;
console.log(`String length: ${strLength}`);

// Non-null assertion
function getValue(): string | null {
    return "value";
}
const definiteValue: string = getValue()!;
console.log(`Definite value: ${definiteValue}`);

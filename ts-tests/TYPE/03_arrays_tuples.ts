/**
 * Test: Arrays and Tuples
 * Demonstrates: array types, tuple types, array methods
 */

// Array type declarations
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: Array<string> = ["a", "b", "c"];
const mixed: (number | string)[] = [1, "two", 3, "four"];

console.log(`Numbers: ${numbers}`);
console.log(`Strings: ${strings}`);
console.log(`Mixed: ${mixed}`);

// Array with holes (sparse array)
const sparse: (number | undefined)[] = [1, , 3, , 5];
console.log(`Sparse array: ${sparse}`);
console.log(`Sparse[1]: ${sparse[1]}`); // undefined (hole)

// Array methods
console.log(`Length: ${numbers.length}`);
console.log(`First: ${numbers[0]}`);
console.log(`Last: ${numbers[numbers.length - 1]}`);

// Push and pop
const arr = [1, 2, 3];
arr.push(4);
console.log(`After push: ${arr}`);
const popped = arr.pop();
console.log(`Popped: ${popped}, Array: ${arr}`);

// Shift and unshift
arr.unshift(0);
console.log(`After unshift: ${arr}`);
const shifted = arr.shift();
console.log(`Shifted: ${shifted}, Array: ${arr}`);

// Slice and splice
const original = [1, 2, 3, 4, 5];
const sliced = original.slice(1, 4);
console.log(`Sliced (1,4): ${sliced}`);

const toSplice = [1, 2, 3, 4, 5];
const removed = toSplice.splice(2, 2, 10, 11);
console.log(`Removed: ${removed}, After splice: ${toSplice}`);

// Find and filter
const items = [10, 20, 30, 40, 50];
const found = items.find(x => x > 25);
const filtered = items.filter(x => x > 25);
console.log(`Found (>25): ${found}`);
console.log(`Filtered (>25): ${filtered}`);

// Map and reduce
const doubled = items.map(x => x * 2);
const sum = items.reduce((acc, x) => acc + x, 0);
console.log(`Doubled: ${doubled}`);
console.log(`Sum: ${sum}`);

// Tuple types - fixed length arrays with specific types
const tuple: [string, number] = ["age", 30];
const point3D: [number, number, number] = [10, 20, 30];
const namedTuple: [name: string, age: number, active: boolean] = ["Alice", 25, true];

console.log(`Tuple: ${tuple}`);
console.log(`Point3D: ${point3D}`);
console.log(`Named tuple: ${namedTuple}`);

// Accessing tuple elements
const [name, age] = tuple;
console.log(`Destructured: name=${name}, age=${age}`);

// Tuple with optional element
const optionalTuple: [string, number?] = ["hello"];
console.log(`Optional tuple: ${optionalTuple}`);

// Tuple with rest element
const restTuple: [string, ...number[]] = ["values", 1, 2, 3, 4, 5];
console.log(`Rest tuple: ${restTuple}`);

// Readonly array
const readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4); // Error: cannot modify
console.log(`Readonly array: ${readonlyArr}`);

// Array spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(`Combined: ${combined}`);

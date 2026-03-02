/**
 * Test: Dynamic Object Creation
 * Demonstrates: creating objects dynamically from literals, arrays, key-value pairs
 */

// Object literal with computed property names
const propName = "dynamicKey";
const propValue = 42;

const obj1 = {
    staticKey: "static value",
    [propName]: propValue,
    [`computed_${1 + 1}`]: "computed name"
};

console.log(`obj1.staticKey: ${obj1.staticKey}`);
console.log(`obj1[propName]: ${obj1[propName]}`);
console.log(`obj1.computed_2: ${obj1["computed_2"]}`);

// Building object from array of key-value pairs
const pairs: [string, number][] = [
    ["one", 1],
    ["two", 2],
    ["three", 3]
];

const fromPairs: { [key: string]: number } = {};
for (const [key, value] of pairs) {
    fromPairs[key] = value;
}
console.log(`From pairs: ${JSON.stringify(fromPairs)}`);

// Using Object.fromEntries
const entries: [string, string][] = [
    ["name", "Alice"],
    ["city", "Boston"],
    ["country", "USA"]
];
const fromEntries = Object.fromEntries(entries);
console.log(`From entries: ${JSON.stringify(fromEntries)}`);

// Dynamic object with index signature
const dynamicObj: { [key: string]: any } = {};

dynamicObj["string"] = "hello";
dynamicObj["number"] = 42;
dynamicObj["boolean"] = true;
dynamicObj["array"] = [1, 2, 3];
dynamicObj["nested"] = { a: 1, b: 2 };

console.log(`Dynamic object keys: ${Object.keys(dynamicObj)}`);
console.log(`Dynamic object: ${JSON.stringify(dynamicObj)}`);

// Creating object from Map
const map = new Map<string, number>([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

const fromMap = Object.fromEntries(map);
console.log(`From Map: ${JSON.stringify(fromMap)}`);

// Object.assign for merging
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const merged = Object.assign({}, target, source1, source2);
console.log(`Merged: ${JSON.stringify(merged)}`);

// Object spread for dynamic creation
function createConfig(overrides: object): object {
    const defaults = {
        debug: false,
        timeout: 1000,
        retries: 3
    };
    return { ...defaults, ...overrides };
}

const config = createConfig({ debug: true, timeout: 5000 });
console.log(`Config: ${JSON.stringify(config)}`);

// Creating object with dynamic methods
function createCalculator(initialValue: number) {
    return {
        value: initialValue,
        ["add"](n: number) {
            this.value += n;
            return this;
        },
        ["multiply"](n: number) {
            this.value *= n;
            return this;
        },
        get result() {
            return this.value;
        }
    };
}

const calc = createCalculator(10);
calc.add(5).multiply(2);
console.log(`Calculator result: ${calc.result}`);

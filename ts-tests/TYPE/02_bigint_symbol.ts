/**
 * Test: BigInt and Symbol Types
 * Demonstrates: bigint for large integers, Symbol for unique identifiers
 */

// BigInt - for integers larger than Number.MAX_SAFE_INTEGER
const bigInt1: bigint = 9007199254740991n; // MAX_SAFE_INTEGER
const bigInt2: bigint = 9007199254740992n; // Larger than MAX_SAFE_INTEGER
const bigInt3: bigint = BigInt(123456789012345678901234567890n);
const bigIntFromString: bigint = BigInt("999999999999999999999999999999");

console.log(`BigInt 1: ${bigInt1}`);
console.log(`BigInt 2: ${bigInt2}`);
console.log(`BigInt 3: ${bigInt3}`);
console.log(`BigInt from string: ${bigIntFromString}`);

// BigInt operations
const sum: bigint = bigInt1 + bigInt2;
const product: bigint = 1000000n * 1000000n;
const division: bigint = bigInt1 / 2n; // Integer division
const modulo: bigint = bigInt1 % 7n;

console.log(`Sum: ${sum}`);
console.log(`Product: ${product}`);
console.log(`Division: ${division}`);
console.log(`Modulo: ${modulo}`);

// BigInt comparison
console.log(`bigInt1 > bigInt2: ${bigInt1 > bigInt2}`);
console.log(`bigInt1 === bigInt1: ${bigInt1 === bigInt1}`);

// Note: Cannot mix BigInt and Number in operations
// Must convert explicitly
const num: number = 100;
const bigNum: bigint = BigInt(num);
console.log(`Number to BigInt: ${bigNum}`);

// Symbol - unique identifiers
const sym1: symbol = Symbol();
const sym2: symbol = Symbol();
const symWithDesc: symbol = Symbol("description");
const symWithDesc2: symbol = Symbol("description");

console.log(`sym1 === sym2: ${sym1 === sym2}`); // false - each Symbol is unique
console.log(`symWithDesc === symWithDesc2: ${symWithDesc === symWithDesc2}`); // false
console.log(`Symbol description: ${symWithDesc.description}`);

// Global Symbol registry
const globalSym1: symbol = Symbol.for("app.id");
const globalSym2: symbol = Symbol.for("app.id");
console.log(`Global symbols equal: ${globalSym1 === globalSym2}`); // true

// Get key for global symbol
const keyForSym: string | undefined = Symbol.keyFor(globalSym1);
console.log(`Key for global symbol: ${keyForSym}`);

// Symbol as object property key
const ID: symbol = Symbol("id");
const NAME: symbol = Symbol("name");

const obj: { [key: symbol]: any; visible: string } = {
    [ID]: 12345,
    [NAME]: "MyObject",
    visible: "This is visible"
};

console.log(`Object[ID]: ${obj[ID]}`);
console.log(`Object[NAME]: ${obj[NAME]}`);

// Well-known Symbols
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(`First iteration: ${iterator.next().value}`);
console.log(`Second iteration: ${iterator.next().value}`);

// Custom iterator using Symbol.iterator
const range = {
    start: 1,
    end: 5,
    [Symbol.iterator](): Iterator<number> {
        let current = this.start;
        const end = this.end;
        return {
            next(): IteratorResult<number> {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

console.log("Range iteration:");
for (const n of range) {
    console.log(n);
}

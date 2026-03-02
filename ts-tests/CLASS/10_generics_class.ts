/**
 * Test: Generic Classes
 * Demonstrates: generic type parameters, constraints, generic methods
 */

// Simple generic class
class Box<T> {
    private content: T;

    constructor(value: T) {
        this.content = value;
    }

    getValue(): T {
        return this.content;
    }

    setValue(value: T): void {
        this.content = value;
    }
}

// Generic class with multiple type parameters
class Pair<K, V> {
    constructor(public key: K, public value: V) {}

    swap(): Pair<V, K> {
        return new Pair(this.value, this.key);
    }

    toString(): string {
        return `(${this.key}, ${this.value})`;
    }
}

// Generic class with constraint
interface HasLength {
    length: number;
}

class Collection<T extends HasLength> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getByMinLength(minLength: number): T[] {
        return this.items.filter(item => item.length >= minLength);
    }

    getTotalLength(): number {
        return this.items.reduce((sum, item) => sum + item.length, 0);
    }
}

// Generic stack implementation
class Stack<T> {
    private elements: T[] = [];

    push(element: T): void {
        this.elements.push(element);
    }

    pop(): T | undefined {
        return this.elements.pop();
    }

    peek(): T | undefined {
        return this.elements[this.elements.length - 1];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    size(): number {
        return this.elements.length;
    }
}

// Usage
const numberBox = new Box<number>(42);
console.log(`Number box: ${numberBox.getValue()}`);

const stringBox = new Box<string>("Hello");
console.log(`String box: ${stringBox.getValue()}`);

const pair = new Pair<string, number>("age", 25);
console.log(`Pair: ${pair.toString()}`);
const swapped = pair.swap();
console.log(`Swapped: ${swapped.toString()}`);

const strings = new Collection<string>();
strings.add("hello");
strings.add("world");
strings.add("hi");
console.log(`Total length: ${strings.getTotalLength()}`);
console.log(`Min length 4: ${strings.getByMinLength(4)}`);

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(`Stack peek: ${stack.peek()}`);
console.log(`Stack pop: ${stack.pop()}`);
console.log(`Stack size: ${stack.size()}`);

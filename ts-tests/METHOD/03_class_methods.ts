/**
 * Test: Class Methods
 * Demonstrates: instance methods, static methods, this binding in methods
 */

class StringUtils {
    // Static method - called on class, not instance
    static reverse(str: string): string {
        return str.split("").reverse().join("");
    }

    static capitalize(str: string): string {
        if (str.length === 0) return str;
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }

    static countWords(str: string): number {
        return str.trim().split(/\s+/).filter(w => w.length > 0).length;
    }
}

class Person {
    name: string;
    private greetCount: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    // Instance method
    greet(): string {
        this.greetCount++;
        return `Hello, I'm ${this.name}`;
    }

    // Method returning 'this' for chaining
    setName(name: string): this {
        this.name = name;
        return this;
    }

    // Getter method
    getGreetCount(): number {
        return this.greetCount;
    }

    // Arrow function as method - preserves 'this'
    greetLater = (): void => {
        setTimeout(() => {
            console.log(this.greet());
        }, 0);
    };
}

class Calculator {
    private value: number = 0;

    // Fluent interface with method chaining
    setValue(n: number): this {
        this.value = n;
        return this;
    }

    add(n: number): this {
        this.value += n;
        return this;
    }

    subtract(n: number): this {
        this.value -= n;
        return this;
    }

    multiply(n: number): this {
        this.value *= n;
        return this;
    }

    getResult(): number {
        return this.value;
    }
}

class EventEmitter {
    private listeners: Map<string, Array<(...args: any[]) => void>> = new Map();

    // Method with callback parameter
    on(event: string, callback: (...args: any[]) => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    emit(event: string, ...args: any[]): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(cb => cb(...args));
        }
    }
}

// Usage
console.log(`Reverse: ${StringUtils.reverse("hello")}`);
console.log(`Capitalize: ${StringUtils.capitalize("hELLO")}`);
console.log(`Word count: ${StringUtils.countWords("Hello World TypeScript")}`);

const person = new Person("Alice");
console.log(person.greet());
console.log(person.setName("Bob").greet());
console.log(`Greet count: ${person.getGreetCount()}`);

const calc = new Calculator();
const result = calc.setValue(10).add(5).multiply(2).subtract(3).getResult();
console.log(`Calc result: ${result}`);

const emitter = new EventEmitter();
emitter.on("message", (msg: string) => console.log(`Received: ${msg}`));
emitter.emit("message", "Hello Events!");

/**
 * Test: Basic Class Definition
 * Demonstrates: class definition, constructor, properties, and methods
 */

class Person {
    // Properties
    name: string;
    age: number;
    private id: number;

    // Constructor
    constructor(name: string, age: number, id: number) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    // Instance method
    greet(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }

    // Method accessing private property
    getId(): number {
        return this.id;
    }

    // Method with parameters
    celebrateBirthday(): void {
        this.age += 1;
        console.log(`Happy birthday! Now ${this.age} years old.`);
    }
}

// Create instances
const person1 = new Person("Alice", 30, 1001);
const person2 = new Person("Bob", 25, 1002);

// Call methods
console.log(person1.greet());
console.log(person2.greet());

// Access properties
console.log(`Person 1 name: ${person1.name}`);
console.log(`Person 1 ID: ${person1.getId()}`);

// Modify properties
person1.celebrateBirthday();
console.log(person1.greet());

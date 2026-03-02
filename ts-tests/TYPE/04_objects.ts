/**
 * Test: Object Types
 * Demonstrates: object literals, object type annotations, global object
 */

// Basic object literal
const person = {
    name: "Alice",
    age: 30,
    isActive: true
};

console.log(`Person: ${person.name}, ${person.age}`);

// Object with type annotation
const employee: {
    id: number;
    name: string;
    department: string;
    salary?: number; // Optional property
} = {
    id: 1,
    name: "Bob",
    department: "Engineering"
};

console.log(`Employee: ${employee.name}, Dept: ${employee.department}`);
console.log(`Salary: ${employee.salary}`); // undefined

// Object type via interface
interface Car {
    brand: string;
    model: string;
    year: number;
    features: string[];
}

const car: Car = {
    brand: "Toyota",
    model: "Camry",
    year: 2024,
    features: ["GPS", "Bluetooth", "Backup Camera"]
};

console.log(`Car: ${car.brand} ${car.model} (${car.year})`);

// Object type via type alias
type Point = {
    x: number;
    y: number;
};

const origin: Point = { x: 0, y: 0 };
const point: Point = { x: 10, y: 20 };

console.log(`Origin: (${origin.x}, ${origin.y})`);
console.log(`Point: (${point.x}, ${point.y})`);

// Nested objects
const company = {
    name: "TechCorp",
    address: {
        street: "123 Main St",
        city: "San Francisco",
        country: "USA"
    },
    employees: [
        { name: "Alice", role: "Developer" },
        { name: "Bob", role: "Designer" }
    ]
};

console.log(`Company: ${company.name}`);
console.log(`Address: ${company.address.city}, ${company.address.country}`);
console.log(`First employee: ${company.employees[0].name}`);

// Object with index signature
const dictionary: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3
};

dictionary["four"] = 4;
console.log(`Dictionary: one=${dictionary["one"]}, four=${dictionary["four"]}`);

// Object methods
const calculator = {
    value: 0,
    add(n: number): number {
        this.value += n;
        return this.value;
    },
    reset(): void {
        this.value = 0;
    }
};

calculator.add(10);
calculator.add(5);
console.log(`Calculator value: ${calculator.value}`);

// Global object reference
const globalObj = globalThis;
console.log(`Global Math.PI: ${globalObj.Math.PI}`);
console.log(`Global parseInt: ${typeof globalObj.parseInt}`);

// Object.keys, Object.values, Object.entries
const data = { a: 1, b: 2, c: 3 };
console.log(`Keys: ${Object.keys(data)}`);
console.log(`Values: ${Object.values(data)}`);
console.log(`Entries: ${JSON.stringify(Object.entries(data))}`);

// Object spread
const defaults = { color: "blue", size: "medium" };
const custom = { size: "large", weight: 10 };
const merged = { ...defaults, ...custom };
console.log(`Merged: ${JSON.stringify(merged)}`);

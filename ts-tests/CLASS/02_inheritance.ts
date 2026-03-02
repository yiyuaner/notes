/**
 * Test: Class Inheritance
 * Demonstrates: extends keyword, inheritance hierarchy, method inheritance
 */

// Base class
class Animal {
    name: string;
    protected energy: number;

    constructor(name: string, energy: number = 100) {
        this.name = name;
        this.energy = energy;
    }

    move(distance: number): void {
        this.energy -= distance;
        console.log(`${this.name} moved ${distance} meters. Energy: ${this.energy}`);
    }

    eat(amount: number): void {
        this.energy += amount;
        console.log(`${this.name} ate and gained ${amount} energy. Energy: ${this.energy}`);
    }

    getEnergy(): number {
        return this.energy;
    }
}

// Derived class
class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name, 150); // Dogs start with more energy
        this.breed = breed;
    }

    bark(): void {
        console.log(`${this.name} says: Woof! Woof!`);
    }
}

// Further derived class
class Bird extends Animal {
    wingspan: number;

    constructor(name: string, wingspan: number) {
        super(name, 80);
        this.wingspan = wingspan;
    }

    fly(distance: number): void {
        this.energy -= distance * 2; // Flying costs more energy
        console.log(`${this.name} flew ${distance} meters. Energy: ${this.energy}`);
    }
}

// Usage
const dog = new Dog("Buddy", "Golden Retriever");
dog.bark();
dog.move(10);
dog.eat(20);

const bird = new Bird("Tweety", 30);
bird.move(5);
bird.fly(10);
console.log(`Bird energy: ${bird.getEnergy()}`);

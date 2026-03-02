/**
 * Test: instanceof Operator
 * Demonstrates: runtime type checking with instanceof
 */

// Base class
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak(): string {
        return `${this.name} makes a sound`;
    }
}

// Derived classes
class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    speak(): string {
        return `${this.name} barks`;
    }
    fetch(): string {
        return `${this.name} fetches the ball`;
    }
}

class Cat extends Animal {
    indoor: boolean;
    constructor(name: string, indoor: boolean) {
        super(name);
        this.indoor = indoor;
    }
    speak(): string {
        return `${this.name} meows`;
    }
    purr(): string {
        return `${this.name} is purring`;
    }
}

class Bird extends Animal {
    canFly: boolean;
    constructor(name: string, canFly: boolean) {
        super(name);
        this.canFly = canFly;
    }
    speak(): string {
        return `${this.name} chirps`;
    }
}

// Using instanceof for type narrowing
function describeAnimal(animal: Animal): string {
    let description = animal.speak();

    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog here
        description += `, Breed: ${animal.breed}`;
        description += `, ${animal.fetch()}`;
    } else if (animal instanceof Cat) {
        // TypeScript knows animal is Cat here
        description += `, Indoor: ${animal.indoor}`;
        description += `, ${animal.purr()}`;
    } else if (animal instanceof Bird) {
        // TypeScript knows animal is Bird here
        description += `, Can fly: ${animal.canFly}`;
    }

    return description;
}

// Create instances
const animals: Animal[] = [
    new Dog("Buddy", "Golden Retriever"),
    new Cat("Whiskers", true),
    new Bird("Tweety", true),
    new Dog("Max", "German Shepherd"),
    new Cat("Luna", false)
];

// Process each animal
for (const animal of animals) {
    console.log(describeAnimal(animal));
    console.log(`  Is Dog: ${animal instanceof Dog}`);
    console.log(`  Is Cat: ${animal instanceof Cat}`);
    console.log(`  Is Bird: ${animal instanceof Bird}`);
    console.log(`  Is Animal: ${animal instanceof Animal}`);
}

// instanceof with built-in types
const date = new Date();
const array = [1, 2, 3];
const regex = /pattern/;
const error = new Error("test");

console.log(`date instanceof Date: ${date instanceof Date}`);
console.log(`array instanceof Array: ${array instanceof Array}`);
console.log(`regex instanceof RegExp: ${regex instanceof RegExp}`);
console.log(`error instanceof Error: ${error instanceof Error}`);

// instanceof with constructor functions
function Person(this: any, name: string) {
    this.name = name;
}

const personInstance = new (Person as any)("Alice");
console.log(`personInstance instanceof Person: ${personInstance instanceof (Person as any)}`);

/**
 * Test: Type Guards and Runtime Type Checking
 * Demonstrates: typeof, instanceof, custom type guards, discriminated unions
 */

// typeof type guard
function processValue(value: string | number | boolean | object): string {
    if (typeof value === "string") {
        return `String: ${value.toUpperCase()}`;
    }
    if (typeof value === "number") {
        return `Number: ${value.toFixed(2)}`;
    }
    if (typeof value === "boolean") {
        return `Boolean: ${value ? "yes" : "no"}`;
    }
    if (typeof value === "object") {
        return `Object: ${JSON.stringify(value)}`;
    }
    return "Unknown type";
}

console.log(processValue("hello"));
console.log(processValue(42.5));
console.log(processValue(true));
console.log(processValue({ key: "value" }));

// Custom type guard function
interface Fish {
    swim(): void;
    name: string;
}

interface Bird {
    fly(): void;
    name: string;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function isBird(pet: Fish | Bird): pet is Bird {
    return (pet as Bird).fly !== undefined;
}

function handlePet(pet: Fish | Bird): void {
    console.log(`Pet name: ${pet.name}`);
    if (isFish(pet)) {
        pet.swim();
    } else {
        pet.fly();
    }
}

const fish: Fish = {
    name: "Nemo",
    swim() { console.log("Swimming..."); }
};

const bird: Bird = {
    name: "Tweety",
    fly() { console.log("Flying..."); }
};

handlePet(fish);
handlePet(bird);

// Discriminated union with type guard
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        case "rectangle":
            return shape.width * shape.height;
    }
}

const shapes: Shape[] = [
    { kind: "circle", radius: 5 },
    { kind: "square", sideLength: 4 },
    { kind: "rectangle", width: 3, height: 6 }
];

for (const shape of shapes) {
    console.log(`${shape.kind} area: ${getArea(shape).toFixed(2)}`);
}

// Truthiness narrowing
function printAll(strs: string | string[] | null): void {
    if (strs) { // Truthy check
        if (typeof strs === "object") {
            // strs is string[]
            for (const s of strs) {
                console.log(s);
            }
        } else {
            // strs is string
            console.log(strs);
        }
    } else {
        console.log("No strings provided");
    }
}

printAll("single");
printAll(["one", "two", "three"]);
printAll(null);

// Array.isArray type guard
function processItems(items: string | string[]): string[] {
    if (Array.isArray(items)) {
        return items;
    }
    return [items];
}

console.log(`Process single: ${processItems("item")}`);
console.log(`Process array: ${processItems(["a", "b", "c"])}`);

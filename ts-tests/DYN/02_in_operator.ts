/**
 * Test: 'in' Operator
 * Demonstrates: property existence checking, type narrowing with 'in'
 */

// Interfaces for discriminated unions
interface Car {
    type: "car";
    wheels: number;
    drive(): void;
}

interface Boat {
    type: "boat";
    propellers: number;
    sail(): void;
}

interface Plane {
    type: "plane";
    engines: number;
    fly(): void;
}

type Vehicle = Car | Boat | Plane;

// Using 'in' for type narrowing
function operateVehicle(vehicle: Vehicle): void {
    // Check which methods are available
    if ("drive" in vehicle) {
        console.log(`This is a car with ${vehicle.wheels} wheels`);
        vehicle.drive();
    }

    if ("sail" in vehicle) {
        console.log(`This is a boat with ${vehicle.propellers} propellers`);
        vehicle.sail();
    }

    if ("fly" in vehicle) {
        console.log(`This is a plane with ${vehicle.engines} engines`);
        vehicle.fly();
    }
}

// Create vehicles
const car: Car = {
    type: "car",
    wheels: 4,
    drive() { console.log("Driving on the road"); }
};

const boat: Boat = {
    type: "boat",
    propellers: 2,
    sail() { console.log("Sailing on water"); }
};

const plane: Plane = {
    type: "plane",
    engines: 4,
    fly() { console.log("Flying in the sky"); }
};

operateVehicle(car);
operateVehicle(boat);
operateVehicle(plane);

// 'in' with plain objects
const obj = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
};

console.log(`'name' in obj: ${"name" in obj}`);
console.log(`'address' in obj: ${"address" in obj}`);
console.log(`'toString' in obj: ${"toString" in obj}`); // inherited property

// 'in' with optional properties
interface User {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

function contactUser(user: User): string {
    if ("email" in user && user.email) {
        return `Emailing ${user.name} at ${user.email}`;
    }
    if ("phone" in user && user.phone) {
        return `Calling ${user.name} at ${user.phone}`;
    }
    return `Cannot contact ${user.name}`;
}

const user1: User = { id: 1, name: "Bob", email: "bob@example.com" };
const user2: User = { id: 2, name: "Carol", phone: "555-1234" };
const user3: User = { id: 3, name: "Dave" };

console.log(contactUser(user1));
console.log(contactUser(user2));
console.log(contactUser(user3));

// 'in' with arrays (checking index existence)
const arr = [10, 20, 30];
console.log(`0 in arr: ${0 in arr}`);
console.log(`5 in arr: ${5 in arr}`);
console.log(`'length' in arr: ${"length" in arr}`);

// Sparse array
const sparse = [1, , 3];
console.log(`1 in sparse: ${1 in sparse}`); // false - hole
console.log(`0 in sparse: ${0 in sparse}`); // true
console.log(`2 in sparse: ${2 in sparse}`); // true

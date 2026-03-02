/**
 * Test: Dynamic Property Manipulation
 * Demonstrates: adding, modifying, and deleting object properties at runtime
 */

// Start with a basic object
const user: { [key: string]: any } = {
    id: 1,
    name: "Alice"
};

console.log("Initial object:", JSON.stringify(user));

// Add properties dynamically
user.email = "alice@example.com";
user["phone"] = "555-1234";
user.address = {
    city: "Boston",
    zip: "02101"
};

console.log("After adding properties:", JSON.stringify(user));

// Modify existing properties
user.name = "Alice Smith";
user["email"] = "alice.smith@example.com";

console.log("After modifying:", JSON.stringify(user));

// Delete properties
delete user.phone;
delete user["address"];

console.log("After deleting:", JSON.stringify(user));
console.log(`'phone' in user: ${"phone" in user}`);

// Object.defineProperty for more control
const product: { [key: string]: any } = {};

Object.defineProperty(product, "id", {
    value: 100,
    writable: false, // Cannot be changed
    enumerable: true,
    configurable: false
});

Object.defineProperty(product, "name", {
    value: "Widget",
    writable: true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(product, "secret", {
    value: "hidden",
    enumerable: false // Won't show in for...in or Object.keys
});

console.log(`Product: ${JSON.stringify(product)}`);
console.log(`Product.secret: ${product.secret}`);
console.log(`Keys: ${Object.keys(product)}`);

// Try to modify read-only property (fails silently in non-strict mode)
product.id = 200;
console.log(`Product.id after attempted change: ${product.id}`);

// Object.defineProperties for multiple properties
const config: { [key: string]: any } = {};

Object.defineProperties(config, {
    debug: {
        value: true,
        writable: true,
        enumerable: true
    },
    version: {
        value: "1.0.0",
        writable: false,
        enumerable: true
    }
});

console.log(`Config: ${JSON.stringify(config)}`);

// Check property existence
console.log(`hasOwnProperty 'name': ${user.hasOwnProperty("name")}`);
console.log(`hasOwnProperty 'toString': ${user.hasOwnProperty("toString")}`);

// Object.getOwnPropertyNames (includes non-enumerable)
console.log(`Property names: ${Object.getOwnPropertyNames(product)}`);

// Object.getOwnPropertyDescriptor
const descriptor = Object.getOwnPropertyDescriptor(product, "id");
console.log(`id descriptor: ${JSON.stringify(descriptor)}`);

// Prevent object extension
const frozen = { a: 1, b: 2 };
Object.preventExtensions(frozen);
(frozen as any).c = 3; // Won't be added
console.log(`After preventExtensions: ${JSON.stringify(frozen)}`);

// Object.seal - prevent add/delete, allow modify
const sealed = { x: 10, y: 20 };
Object.seal(sealed);
sealed.x = 100; // Allowed
delete (sealed as any).y; // Won't delete
console.log(`Sealed object: ${JSON.stringify(sealed)}`);
console.log(`Is sealed: ${Object.isSealed(sealed)}`);

// Object.freeze - completely immutable
const frozenObj = Object.freeze({ value: 42 });
(frozenObj as any).value = 100; // Won't change
console.log(`Frozen object: ${JSON.stringify(frozenObj)}`);
console.log(`Is frozen: ${Object.isFrozen(frozenObj)}`);

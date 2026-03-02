/**
 * Test: Wildcard Import (Main file)
 * Demonstrates: importing entire module as namespace object
 */

// Import entire module as namespace
import * as Greetings from "./04_wildcard_import_lib";

// Access exports through namespace
console.log(`Version: ${Greetings.VERSION}`);
console.log(`Author: ${Greetings.AUTHOR}`);

// Use functions
console.log(Greetings.greet("World"));
console.log(Greetings.farewell("Friend"));

// Use class
const person = new Greetings.Person("Alice", 30);
console.log(person.introduce());

// Use factory function
const greeting = Greetings.createGreeting("Bob");
console.log(`Greeting: ${greeting.message}`);

// Use enum
const status: Greetings.Status = Greetings.Status.Active;
console.log(`Status: ${status}`);

// Dynamic access to namespace members
const moduleName = "Greetings";
console.log(`Module has VERSION: ${"VERSION" in Greetings}`);
console.log(`Module has greet: ${typeof Greetings.greet === "function"}`);

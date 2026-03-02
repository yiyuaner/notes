/**
 * Test: Wildcard Import (Library file)
 * Demonstrates: module with multiple exports for namespace import
 */

export const VERSION = "1.0.0";
export const AUTHOR = "TypeScript Team";

export function greet(name: string): string {
    return `Hello, ${name}!`;
}

export function farewell(name: string): string {
    return `Goodbye, ${name}!`;
}

export class Person {
    constructor(public name: string, public age: number) {}

    introduce(): string {
        return `I am ${this.name}, ${this.age} years old.`;
    }
}

export interface Greeting {
    message: string;
    recipient: string;
}

export function createGreeting(recipient: string): Greeting {
    return {
        message: greet(recipient),
        recipient
    };
}

export enum Status {
    Active = "active",
    Inactive = "inactive",
    Pending = "pending"
}

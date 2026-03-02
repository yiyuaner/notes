/**
 * Test: Basic Module Export (Library file)
 * Demonstrates: named exports, default export, export declarations
 */

// Named exports
export const PI = 3.14159;
export const E = 2.71828;

// Export function
export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

// Export class
export class Calculator {
    private result: number = 0;

    add(value: number): Calculator {
        this.result += value;
        return this;
    }

    subtract(value: number): Calculator {
        this.result -= value;
        return this;
    }

    getResult(): number {
        return this.result;
    }

    reset(): void {
        this.result = 0;
    }
}

// Export interface
export interface MathOperation {
    execute(a: number, b: number): number;
}

// Export type alias
export type NumberPair = [number, number];

// Default export
class MathUtils {
    static square(x: number): number {
        return x * x;
    }

    static cube(x: number): number {
        return x * x * x;
    }
}

export default MathUtils;

/**
 * Test: Static Members
 * Demonstrates: static properties, static methods, class-level state
 */

class Counter {
    private static count: number = 0;
    private id: number;

    constructor() {
        Counter.count++;
        this.id = Counter.count;
    }

    // Static method to get count
    static getCount(): number {
        return Counter.count;
    }

    // Static method to reset
    static reset(): void {
        Counter.count = 0;
    }

    getId(): number {
        return this.id;
    }
}

class MathUtils {
    static readonly PI: number = 3.14159265359;
    static readonly E: number = 2.71828182845;

    static square(x: number): number {
        return x * x;
    }

    static cube(x: number): number {
        return x * x * x;
    }

    static factorial(n: number): number {
        if (n <= 1) return 1;
        return n * MathUtils.factorial(n - 1);
    }

    static circleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
}

class Logger {
    private static instance: Logger | null = null;
    private logs: string[];

    private constructor() {
        this.logs = [];
    }

    // Singleton pattern using static method
    static getInstance(): Logger {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string): void {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${message}`);
        console.log(`[${timestamp}] ${message}`);
    }

    getLogs(): string[] {
        return [...this.logs];
    }
}

// Usage - Counter
console.log(`Initial count: ${Counter.getCount()}`);
const c1 = new Counter();
const c2 = new Counter();
const c3 = new Counter();
console.log(`After creating 3 counters: ${Counter.getCount()}`);
console.log(`c1 id: ${c1.getId()}, c2 id: ${c2.getId()}, c3 id: ${c3.getId()}`);

// Usage - MathUtils
console.log(`PI: ${MathUtils.PI}`);
console.log(`Square of 5: ${MathUtils.square(5)}`);
console.log(`Factorial of 5: ${MathUtils.factorial(5)}`);
console.log(`Circle area (r=3): ${MathUtils.circleArea(3)}`);

// Usage - Logger singleton
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log("First message");
logger2.log("Second message");
console.log(`Same instance: ${logger1 === logger2}`);

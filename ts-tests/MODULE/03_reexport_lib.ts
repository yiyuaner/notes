/**
 * Test: Re-exports (Library file)
 * Demonstrates: re-exporting, export aggregation
 */

// Internal utilities
function internalHelper(): void {
    console.log("Internal helper called");
}

// Exported items
export class Logger {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    log(message: string): void {
        console.log(`[${this.prefix}] ${message}`);
    }

    error(message: string): void {
        console.log(`[${this.prefix}] ERROR: ${message}`);
    }
}

export class Formatter {
    static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    static formatCurrency(amount: number): string {
        return `$${amount.toFixed(2)}`;
    }
}

export interface Config {
    debug: boolean;
    logLevel: string;
    maxRetries: number;
}

export const DEFAULT_CONFIG: Config = {
    debug: false,
    logLevel: "info",
    maxRetries: 3
};

export type LogLevel = "debug" | "info" | "warn" | "error";

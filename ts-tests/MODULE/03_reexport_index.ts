/**
 * Test: Re-exports (Index/Barrel file)
 * Demonstrates: re-exporting from other modules, selective exports
 */

// Re-export everything from lib
export * from "./03_reexport_lib";

// Re-export with rename
export { Logger as AppLogger } from "./03_reexport_lib";

// Additional exports in the index file
export class Application {
    private name: string;
    private version: string;

    constructor(name: string, version: string) {
        this.name = name;
        this.version = version;
    }

    getInfo(): string {
        return `${this.name} v${this.version}`;
    }
}

// Export a factory function
export function createApp(name: string): Application {
    return new Application(name, "1.0.0");
}

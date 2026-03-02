/**
 * Test: Interfaces
 * Demonstrates: interface definition, implementing interfaces, multiple interfaces
 */

// Basic interface
interface Printable {
    print(): string;
}

// Interface with properties
interface Vehicle {
    brand: string;
    year: number;
    start(): void;
    stop(): void;
}

// Interface extending another interface
interface ElectricVehicle extends Vehicle {
    batteryLevel: number;
    charge(): void;
}

// Class implementing single interface
class Document implements Printable {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    print(): string {
        return `[${this.title}]\n${this.content}`;
    }
}

// Class implementing multiple interfaces
interface Serializable {
    serialize(): string;
}

class Report implements Printable, Serializable {
    data: string[];

    constructor(data: string[]) {
        this.data = data;
    }

    print(): string {
        return this.data.join("\n");
    }

    serialize(): string {
        return JSON.stringify(this.data);
    }
}

// Class implementing extended interface
class Tesla implements ElectricVehicle {
    brand: string;
    year: number;
    batteryLevel: number;

    constructor(year: number) {
        this.brand = "Tesla";
        this.year = year;
        this.batteryLevel = 100;
    }

    start(): void {
        console.log("Tesla starting silently...");
    }

    stop(): void {
        console.log("Tesla stopped.");
    }

    charge(): void {
        this.batteryLevel = 100;
        console.log("Tesla fully charged!");
    }
}

// Usage
const doc = new Document("Hello", "World content here");
console.log(doc.print());

const report = new Report(["Line 1", "Line 2", "Line 3"]);
console.log(report.print());
console.log(report.serialize());

const car = new Tesla(2024);
car.start();
console.log(`Battery: ${car.batteryLevel}%`);
car.stop();

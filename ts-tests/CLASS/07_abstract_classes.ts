/**
 * Test: Abstract Classes
 * Demonstrates: abstract keyword, abstract methods, partial implementations
 */

// Abstract base class
abstract class Employee {
    name: string;
    id: number;
    protected baseSalary: number;

    constructor(name: string, id: number, baseSalary: number) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }

    // Abstract method - must be implemented by subclasses
    abstract calculateBonus(): number;

    // Abstract method
    abstract getRole(): string;

    // Concrete method
    getInfo(): string {
        return `${this.name} (ID: ${this.id}) - ${this.getRole()}`;
    }

    // Concrete method using abstract method
    getTotalCompensation(): number {
        return this.baseSalary + this.calculateBonus();
    }
}

class Manager extends Employee {
    teamSize: number;

    constructor(name: string, id: number, baseSalary: number, teamSize: number) {
        super(name, id, baseSalary);
        this.teamSize = teamSize;
    }

    // Implement abstract method
    calculateBonus(): number {
        return this.baseSalary * 0.2 + this.teamSize * 500;
    }

    // Implement abstract method
    getRole(): string {
        return "Manager";
    }
}

class Developer extends Employee {
    programmingLanguages: string[];

    constructor(name: string, id: number, baseSalary: number, languages: string[]) {
        super(name, id, baseSalary);
        this.programmingLanguages = languages;
    }

    calculateBonus(): number {
        return this.baseSalary * 0.15 + this.programmingLanguages.length * 1000;
    }

    getRole(): string {
        return "Developer";
    }
}

class Intern extends Employee {
    mentor: string;

    constructor(name: string, id: number, mentor: string) {
        super(name, id, 30000); // Fixed base salary for interns
        this.mentor = mentor;
    }

    calculateBonus(): number {
        return 1000; // Small fixed bonus
    }

    getRole(): string {
        return "Intern";
    }
}

// Usage
const employees: Employee[] = [
    new Manager("Alice", 1, 100000, 10),
    new Developer("Bob", 2, 80000, ["TypeScript", "Python", "Go"]),
    new Intern("Charlie", 3, "Alice")
];

for (const emp of employees) {
    console.log(emp.getInfo());
    console.log(`  Bonus: $${emp.calculateBonus()}`);
    console.log(`  Total Compensation: $${emp.getTotalCompensation()}`);
}

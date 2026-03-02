/**
 * Test: Namespaces
 * Demonstrates: namespace declaration, nested namespaces, namespace merging
 */

// Basic namespace
namespace Geometry {
    export const PI = 3.14159;

    export function circleArea(radius: number): number {
        return PI * radius * radius;
    }

    export function rectangleArea(width: number, height: number): number {
        return width * height;
    }

    export class Point {
        constructor(public x: number, public y: number) {}

        distanceTo(other: Point): number {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
}

// Nested namespaces
namespace Company {
    export namespace HR {
        export interface Employee {
            id: number;
            name: string;
            department: string;
        }

        export function createEmployee(id: number, name: string, dept: string): Employee {
            return { id, name, department: dept };
        }
    }

    export namespace Finance {
        export function calculateSalary(basePay: number, bonus: number): number {
            return basePay + bonus;
        }

        export function calculateTax(salary: number, rate: number): number {
            return salary * rate;
        }
    }
}

// Namespace alias
import Geo = Geometry;
import Finance = Company.Finance;

// Namespace merging (adding to existing namespace)
namespace Geometry {
    export function triangleArea(base: number, height: number): number {
        return 0.5 * base * height;
    }

    export class Line {
        constructor(public start: Point, public end: Point) {}

        length(): number {
            return this.start.distanceTo(this.end);
        }
    }
}

// Usage
console.log(`Circle area (r=5): ${Geometry.circleArea(5)}`);
console.log(`Rectangle area (4x6): ${Geometry.rectangleArea(4, 6)}`);
console.log(`Triangle area (base=10, h=5): ${Geometry.triangleArea(10, 5)}`);

const p1 = new Geometry.Point(0, 0);
const p2 = new Geometry.Point(3, 4);
console.log(`Distance: ${p1.distanceTo(p2)}`);

const line = new Geometry.Line(p1, p2);
console.log(`Line length: ${line.length()}`);

// Using alias
console.log(`Using alias - Circle area: ${Geo.circleArea(3)}`);

// Using nested namespaces
const emp = Company.HR.createEmployee(1, "Alice", "Engineering");
console.log(`Employee: ${emp.name}, Dept: ${emp.department}`);

const salary = Finance.calculateSalary(50000, 5000);
const tax = Finance.calculateTax(salary, 0.25);
console.log(`Salary: ${salary}, Tax: ${tax}`);

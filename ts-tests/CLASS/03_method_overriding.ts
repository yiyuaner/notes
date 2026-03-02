/**
 * Test: Method Overriding
 * Demonstrates: overriding parent methods, calling super methods
 */

class Shape {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    getArea(): number {
        return 0;
    }

    describe(): string {
        return `A ${this.color} shape with area ${this.getArea()}`;
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(color: string, width: number, height: number) {
        super(color);
        this.width = width;
        this.height = height;
    }

    // Override getArea
    getArea(): number {
        return this.width * this.height;
    }

    // Override describe and call super
    describe(): string {
        return `${super.describe()} (Rectangle: ${this.width}x${this.height})`;
    }
}

class Circle extends Shape {
    radius: number;

    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }

    // Override getArea
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    // Override describe
    describe(): string {
        return `${super.describe()} (Circle with radius ${this.radius})`;
    }
}

class Square extends Rectangle {
    constructor(color: string, side: number) {
        super(color, side, side);
    }

    // Override describe
    describe(): string {
        return `A ${this.color} square with side ${this.width} and area ${this.getArea()}`;
    }
}

// Usage
const shapes: Shape[] = [
    new Shape("transparent"),
    new Rectangle("blue", 10, 5),
    new Circle("red", 7),
    new Square("green", 4)
];

for (const shape of shapes) {
    console.log(shape.describe());
}

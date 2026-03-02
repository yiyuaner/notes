/**
 * Test: Polymorphism
 * Demonstrates: runtime polymorphism, interface polymorphism, method dispatch
 */

// Interface for polymorphic behavior
interface Drawable {
    draw(): void;
}

interface Resizable {
    resize(factor: number): void;
}

// Base class
class UIComponent implements Drawable {
    x: number;
    y: number;
    visible: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.visible = true;
    }

    draw(): void {
        if (this.visible) {
            console.log(`Drawing component at (${this.x}, ${this.y})`);
        }
    }

    moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

class Button extends UIComponent implements Resizable {
    width: number;
    height: number;
    label: string;

    constructor(x: number, y: number, width: number, height: number, label: string) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.label = label;
    }

    draw(): void {
        console.log(`Drawing button "${this.label}" at (${this.x}, ${this.y}) size ${this.width}x${this.height}`);
    }

    resize(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }

    click(): void {
        console.log(`Button "${this.label}" clicked!`);
    }
}

class TextBox extends UIComponent implements Resizable {
    width: number;
    text: string;

    constructor(x: number, y: number, width: number) {
        super(x, y);
        this.width = width;
        this.text = "";
    }

    draw(): void {
        console.log(`Drawing textbox at (${this.x}, ${this.y}) width ${this.width}, text: "${this.text}"`);
    }

    resize(factor: number): void {
        this.width *= factor;
    }

    setText(text: string): void {
        this.text = text;
    }
}

class Icon extends UIComponent {
    iconName: string;

    constructor(x: number, y: number, iconName: string) {
        super(x, y);
        this.iconName = iconName;
    }

    draw(): void {
        console.log(`Drawing icon "${this.iconName}" at (${this.x}, ${this.y})`);
    }
}

// Function demonstrating polymorphism
function renderAll(components: Drawable[]): void {
    console.log("--- Rendering all components ---");
    for (const component of components) {
        component.draw(); // Polymorphic call
    }
}

function resizeAll(components: Resizable[], factor: number): void {
    console.log(`--- Resizing by factor ${factor} ---`);
    for (const component of components) {
        component.resize(factor);
    }
}

// Usage
const components: UIComponent[] = [
    new Button(10, 10, 100, 30, "Submit"),
    new TextBox(10, 50, 200),
    new Icon(10, 90, "settings"),
    new Button(10, 130, 80, 30, "Cancel")
];

// Polymorphic rendering
renderAll(components);

// Filter resizable components
const resizables: Resizable[] = components.filter(
    (c): c is UIComponent & Resizable => 'resize' in c
);

resizeAll(resizables, 1.5);
renderAll(components);

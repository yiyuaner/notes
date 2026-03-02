/**
 * Test: Getter and Setter Accessors
 * Demonstrates: get and set keywords, computed properties, validation in setters
 */

class Temperature {
    private _celsius: number;

    constructor(celsius: number) {
        this._celsius = celsius;
    }

    // Getter for celsius
    get celsius(): number {
        return this._celsius;
    }

    // Setter for celsius with validation
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("Temperature cannot be below absolute zero");
        }
        this._celsius = value;
    }

    // Getter for fahrenheit (computed)
    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }

    // Setter for fahrenheit
    set fahrenheit(value: number) {
        this._celsius = (value - 32) * 5/9;
    }

    // Getter for kelvin
    get kelvin(): number {
        return this._celsius + 273.15;
    }
}

class BankAccount {
    private _balance: number;
    private _transactions: string[];

    constructor(initialBalance: number) {
        this._balance = initialBalance;
        this._transactions = [];
    }

    // Read-only getter
    get balance(): number {
        return this._balance;
    }

    // Getter for transaction history
    get transactions(): string[] {
        return [...this._transactions]; // Return copy
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this._balance += amount;
            this._transactions.push(`Deposited: ${amount}`);
        }
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            this._transactions.push(`Withdrew: ${amount}`);
            return true;
        }
        return false;
    }
}

class Person {
    private _firstName: string;
    private _lastName: string;

    constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value.trim();
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value.trim();
    }

    // Computed property combining first and last name
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    set fullName(value: string) {
        const parts = value.split(" ");
        this._firstName = parts[0] || "";
        this._lastName = parts.slice(1).join(" ") || "";
    }
}

// Usage
const temp = new Temperature(25);
console.log(`Celsius: ${temp.celsius}`);
console.log(`Fahrenheit: ${temp.fahrenheit}`);
console.log(`Kelvin: ${temp.kelvin}`);

temp.fahrenheit = 100;
console.log(`After setting fahrenheit to 100, celsius: ${temp.celsius}`);

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(`Balance: ${account.balance}`);
console.log(`Transactions: ${account.transactions}`);

const person = new Person("John", "Doe");
console.log(`Full name: ${person.fullName}`);
person.fullName = "Jane Smith";
console.log(`New full name: ${person.fullName}`);

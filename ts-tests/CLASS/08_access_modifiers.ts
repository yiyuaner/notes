/**
 * Test: Access Modifiers
 * Demonstrates: public, private, protected, readonly modifiers
 */

class DatabaseConnection {
    // Public - accessible everywhere
    public host: string;

    // Private - only accessible within this class
    private password: string;

    // Protected - accessible in this class and subclasses
    protected port: number;

    // Readonly - can only be set in constructor
    readonly connectionId: string;

    constructor(host: string, password: string, port: number) {
        this.host = host;
        this.password = password;
        this.port = port;
        this.connectionId = `conn_${Date.now()}`;
    }

    // Public method
    public connect(): void {
        console.log(`Connecting to ${this.host}:${this.port}`);
        this.authenticate();
    }

    // Private method - internal use only
    private authenticate(): void {
        console.log(`Authenticating with password length: ${this.password.length}`);
    }

    // Protected method
    protected getConnectionString(): string {
        return `${this.host}:${this.port}`;
    }
}

class SecureConnection extends DatabaseConnection {
    private encryptionKey: string;

    constructor(host: string, password: string, port: number, key: string) {
        super(host, password, port);
        this.encryptionKey = key;
    }

    // Can access protected members from parent
    showConnectionInfo(): void {
        console.log(`Connection: ${this.getConnectionString()}`);
        console.log(`Port (protected): ${this.port}`);
        // Cannot access: this.password (private in parent)
    }
}

// Parameter properties shorthand
class User {
    constructor(
        public name: string,
        private email: string,
        protected role: string,
        readonly createdAt: Date = new Date()
    ) {}

    getEmail(): string {
        return this.email;
    }

    describe(): string {
        return `User: ${this.name}, Role: ${this.role}, Created: ${this.createdAt}`;
    }
}

class AdminUser extends User {
    constructor(name: string, email: string) {
        super(name, email, "admin");
    }

    promoteUser(user: User): void {
        // Can access protected 'role'
        console.log(`Admin ${this.name} (${this.role}) is promoting a user`);
    }
}

// Usage
const db = new DatabaseConnection("localhost", "secret123", 5432);
console.log(`Host: ${db.host}`); // Public - OK
console.log(`Connection ID: ${db.connectionId}`); // Readonly - OK
db.connect();

const secureDb = new SecureConnection("secure.example.com", "pass", 443, "enc_key");
secureDb.showConnectionInfo();

const user = new User("John", "john@example.com", "user");
console.log(user.describe());
console.log(`Email: ${user.getEmail()}`);

const admin = new AdminUser("Alice", "alice@example.com");
admin.promoteUser(user);

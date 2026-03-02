/**
 * Test: Closures and Lexical Environment
 * Demonstrates: closure capture, lexical scoping, private state via closures
 */

// Basic closure - capturing outer variable
function createCounter(): () => number {
    let count = 0;
    return function(): number {
        count += 1;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(`Counter1: ${counter1()}`); // 1
console.log(`Counter1: ${counter1()}`); // 2
console.log(`Counter2: ${counter2()}`); // 1 (independent)
console.log(`Counter1: ${counter1()}`); // 3

// Closure with parameters
function createMultiplier(factor: number): (n: number) => number {
    return function(n: number): number {
        return n * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(`Double 5: ${double(5)}`);  // 10
console.log(`Triple 5: ${triple(5)}`);  // 15

// Closure for private state
function createBankAccount(initialBalance: number) {
    let balance = initialBalance;

    return {
        deposit(amount: number): void {
            if (amount > 0) {
                balance += amount;
                console.log(`Deposited ${amount}. Balance: ${balance}`);
            }
        },
        withdraw(amount: number): boolean {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                console.log(`Withdrew ${amount}. Balance: ${balance}`);
                return true;
            }
            console.log("Withdrawal failed");
            return false;
        },
        getBalance(): number {
            return balance;
        }
    };
}

const account = createBankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(`Final balance: ${account.getBalance()}`);

// Closure capturing loop variable (demonstrating let vs var behavior)
function createFunctions(): Array<() => number> {
    const funcs: Array<() => number> = [];
    for (let i = 0; i < 3; i++) {
        funcs.push(() => i); // Each closure captures its own 'i'
    }
    return funcs;
}

const funcs = createFunctions();
console.log(`Func 0: ${funcs[0]()}`); // 0
console.log(`Func 1: ${funcs[1]()}`); // 1
console.log(`Func 2: ${funcs[2]()}`); // 2

// Nested closures
function outer(x: number) {
    return function middle(y: number) {
        return function inner(z: number): number {
            return x + y + z;
        };
    };
}

const add5 = outer(5);
const add5and10 = add5(10);
console.log(`5 + 10 + 3 = ${add5and10(3)}`); // 18

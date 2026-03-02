/**
 * Test: 'this' Binding
 * Demonstrates: this context, bind/call/apply, arrow functions and this
 */

// Object with methods demonstrating 'this'
const person = {
    name: "Alice",
    age: 30,

    // Regular method - 'this' depends on call site
    introduce: function(): string {
        return `I'm ${this.name}, ${this.age} years old`;
    },

    // Arrow function - 'this' captured lexically
    getNameArrow: (): string => {
        // Note: 'this' here refers to enclosing scope, not person
        return "Arrow functions capture enclosing 'this'";
    }
};

console.log(person.introduce());

// Method extraction loses 'this'
const extracted = person.introduce;
// extracted() would have undefined 'this'

// Using bind to fix 'this'
const boundIntroduce = person.introduce.bind(person);
console.log(`Bound: ${boundIntroduce()}`);

// Using call and apply
const anotherPerson = { name: "Bob", age: 25 };
console.log(`Call: ${person.introduce.call(anotherPerson)}`);
console.log(`Apply: ${person.introduce.apply(anotherPerson)}`);

// Class with this binding issues and solutions
class Timer {
    seconds: number = 0;

    // Regular method - 'this' can be lost in callbacks
    tick(): void {
        this.seconds++;
        console.log(`Tick: ${this.seconds}`);
    }

    // Arrow method - 'this' always refers to instance
    tickArrow = (): void => {
        this.seconds++;
        console.log(`Tick (arrow): ${this.seconds}`);
    };

    // Method that binds 'this' for callback
    startWithBind(): void {
        const boundTick = this.tick.bind(this);
        boundTick();
        boundTick();
    }

    // Method using arrow function callback
    startWithArrow(): void {
        const callback = () => {
            this.seconds++;
            console.log(`Callback tick: ${this.seconds}`);
        };
        callback();
        callback();
    }
}

const timer = new Timer();
timer.startWithBind();
timer.startWithArrow();

// Arrow function in callback preserves 'this'
const timer2 = new Timer();
timer2.tickArrow();
timer2.tickArrow();

// Function with explicit 'this' type
interface Card {
    suit: string;
    rank: number;
}

interface Deck {
    suits: string[];
    cards: Card[];
    createCard(this: Deck, suit: string, rank: number): Card;
}

const deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: [],
    createCard: function(this: Deck, suit: string, rank: number): Card {
        const card = { suit, rank };
        this.cards.push(card);
        return card;
    }
};

deck.createCard("hearts", 10);
deck.createCard("spades", 1);
console.log(`Deck has ${deck.cards.length} cards`);

/**
 * Test: Callbacks and Async Patterns
 * Demonstrates: callback functions, Promises, async/await
 */

// Callback pattern
function fetchData(callback: (data: string) => void): void {
    // Simulating async operation
    const data = "Fetched data";
    callback(data);
}

fetchData((data) => {
    console.log(`Callback received: ${data}`);
});

// Callback with error handling
function fetchWithError(
    onSuccess: (data: string) => void,
    onError: (error: string) => void
): void {
    const success = true;
    if (success) {
        onSuccess("Data loaded successfully");
    } else {
        onError("Failed to load data");
    }
}

fetchWithError(
    (data) => console.log(`Success: ${data}`),
    (error) => console.log(`Error: ${error}`)
);

// Promise-based function
function asyncFetch(shouldSucceed: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
        if (shouldSucceed) {
            resolve("Async data received");
        } else {
            reject(new Error("Async fetch failed"));
        }
    });
}

// Using Promise with then/catch
asyncFetch(true)
    .then(data => console.log(`Promise resolved: ${data}`))
    .catch(err => console.log(`Promise rejected: ${err}`));

// Async/await function
async function loadData(): Promise<string> {
    const data = await asyncFetch(true);
    return `Processed: ${data}`;
}

// Async function with try/catch
async function loadDataSafe(): Promise<string> {
    try {
        const data = await asyncFetch(true);
        return data;
    } catch (error) {
        return "Default data on error";
    }
}

// Multiple async operations
async function loadMultiple(): Promise<string[]> {
    const results = await Promise.all([
        asyncFetch(true),
        asyncFetch(true),
        asyncFetch(true)
    ]);
    return results;
}

// Sequential async operations
async function loadSequential(): Promise<void> {
    console.log("Start sequential load");
    const first = await asyncFetch(true);
    console.log(`First: ${first}`);
    const second = await asyncFetch(true);
    console.log(`Second: ${second}`);
    console.log("Sequential load complete");
}

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(`Doubled: ${doubled}`);

const evens = numbers.filter((n) => n % 2 === 0);
console.log(`Evens: ${evens}`);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(`Sum: ${sum}`);

numbers.forEach((n, index) => {
    console.log(`Index ${index}: ${n}`);
});

// Async IIFE
(async () => {
    const result = await loadData();
    console.log(result);
})();

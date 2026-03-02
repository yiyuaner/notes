/**
 * Test: Re-exports (Main file)
 * Demonstrates: using re-exported modules
 */

// Import from barrel file
import {
    Logger,
    AppLogger,
    Formatter,
    DEFAULT_CONFIG,
    Application,
    createApp
} from "./03_reexport_index";

import type { Config, LogLevel } from "./03_reexport_index";

// Use re-exported class
const logger = new Logger("Main");
logger.log("Application starting");

// Use renamed export
const appLogger = new AppLogger("App");
appLogger.log("Using renamed export");

// Use Formatter
const today = new Date();
console.log(`Date: ${Formatter.formatDate(today)}`);
console.log(`Price: ${Formatter.formatCurrency(99.99)}`);

// Use config
const config: Config = {
    ...DEFAULT_CONFIG,
    debug: true
};
console.log(`Config: debug=${config.debug}, level=${config.logLevel}`);

// Use type
const level: LogLevel = "warn";
console.log(`Log level: ${level}`);

// Use exports from index file
const app = createApp("MyApp");
console.log(app.getInfo());

const app2 = new Application("AnotherApp", "2.0.0");
console.log(app2.getInfo());

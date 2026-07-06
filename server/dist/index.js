"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_js_1 = require("./utils/error-handler.js");
const logger_js_1 = require("./utils/logger.js");
(0, logger_js_1.logMessage)("App running diagnostics...");
(0, error_handler_js_1.processData)("taskflow diagnostics"); // string পাঠালাম
(0, error_handler_js_1.processData)(100); // number পাঠালাম
(0, error_handler_js_1.processData)(true); // unsupported type পাঠালাম
// ক্রিটিক্যাল এরর থ্রো করা হলো (ফাংশনটি never রিটার্ন করায় এর নিচের কোড আর রান হবে না)
(0, error_handler_js_1.throwAppError)("Database failed to respond!");
// logMessage("This will never print!"); // এই লাইনে এডিটর বলবে: Unreachable code detected

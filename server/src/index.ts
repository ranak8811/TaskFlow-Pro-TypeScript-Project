import { processData, throwAppError } from "./utils/error-handler.js";
import { logMessage } from "./utils/logger.js";

logMessage("App running diagnostics...");

processData("taskflow diagnostics"); // string পাঠালাম
processData(100); // number পাঠালাম
processData(true); // unsupported type পাঠালাম

// ক্রিটিক্যাল এরর থ্রো করা হলো (ফাংশনটি never রিটার্ন করায় এর নিচের কোড আর রান হবে না)
throwAppError("Database failed to respond!");

// logMessage("This will never print!"); // এই লাইনে এডিটর বলবে: Unreachable code detected

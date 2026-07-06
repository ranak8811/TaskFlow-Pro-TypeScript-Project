"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_processor_js_1 = require("./utils/task-processor.js");
const logger_js_1 = require("./utils/logger.js");
// createTask কল করা হচ্ছে (ডিফল্ট ও অপশনাল টেস্ট করা)
const t1 = (0, task_processor_js_1.createTask)("Setup Express"); // description ও priority ছাড়াই
const t2 = (0, task_processor_js_1.createTask)("Configure Router", "Set up backend routing", "HIGH"); // সব প্যারামিটার সহ
(0, logger_js_1.logMessage)(`Task 1: ${t1.title} (Priority: ${t1.priority})`);
(0, logger_js_1.logMessage)(`Task 2: ${t2.title} (Priority: ${t2.priority}) - ${t2.description}`);
const myTasks = ["Database Setup", "Auth Middleware"];
// processTasks কল করা এবং কলব্যাক পাস করা
(0, task_processor_js_1.processTasks)(myTasks, (completed) => {
    (0, logger_js_1.logMessage)(`Callback: Completed "${completed}" successfully!`);
});

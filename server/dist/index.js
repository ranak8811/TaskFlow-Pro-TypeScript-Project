"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = require("./utils/logger.js");
// TaskItem ইন্টারসেকশন টাইপ অনুসরণ করে অবজেক্ট তৈরি
const myTask = {
    id: "tsk-301", // Identifiable এর প্রপার্টি
    createdAt: new Date().toISOString(), // Identifiable এর প্রপার্টি
    title: "Implement Intersection Types", // TaskDetails এর প্রপার্টি
    priority: "HIGH", // TaskDetails ও Literal এর প্রপার্টি
};
(0, logger_js_1.logMessage)(`Task "${myTask.title}" has priority: ${myTask.priority}`);
(0, logger_js_1.logMessage)(`Task ID is: ${myTask.id} and created at: ${myTask.createdAt}`);
// নিচের কমেন্ট করা কোডগুলো এরর বোঝার জন্য ট্রাই করতে পারেন:
// myTask.priority = "URGENT"; // এরর দেখাবে: "URGENT" Priority টাইপে গ্রহণযোগ্য নয়

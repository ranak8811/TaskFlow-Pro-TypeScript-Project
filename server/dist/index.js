"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = require("./utils/logger.js");
const task_js_1 = require("./types/task.js"); // টাস্ক এবং এনাম ইম্পোর্ট করলাম
// Task ইন্টারফেস এবং এনাম ব্যবহার করে একটি নতুন টাস্ক অবজেক্ট তৈরি করলাম
const myTask = {
    id: "tsk-201",
    title: "Setup Database Schema",
    status: task_js_1.TaskStatus.InProgress, // এনাম ভ্যালু ব্যবহার করলাম
    tags: ["database", "prisma", "postgres"], // স্ট্রিং অ্যারে
    assignee: ["usr-101", "Anwar Hossain"], // টাপল: [ID, Name]
};
(0, logger_js_1.logMessage)(`Task "${myTask.title}" is currently: ${myTask.status}`);
(0, logger_js_1.logMessage)(`Assigned to: ${myTask.assignee[1]} (ID: ${myTask.assignee[0]})`);

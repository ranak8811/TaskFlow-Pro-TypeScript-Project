"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = require("./utils/logger.js");
// User ইন্টারফেস অনুযায়ী একটি নতুন ইউজার অবজেক্ট তৈরি করলাম
const newUser = {
    id: "usr-101",
    name: "Anwar Hossain",
    email: "anwar@example.com",
    role: "admin", // bio অপশনাল হওয়ায় এখানে তা না দিলেও কোনো এরর নেই
};
(0, logger_js_1.logMessage)(`Created user: ${newUser.name} with role: ${newUser.role}`);

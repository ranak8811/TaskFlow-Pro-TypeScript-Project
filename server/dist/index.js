"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_js_1 = require("./config/env.js"); // কাস্টম কনফিগ ইম্পোর্ট করলাম
const logger_js_1 = require("./utils/logger.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "TaskFlow Pro API is running!" });
});
// কনফিগ থেকে টাইপ-সেফ পোর্ট রিড করা হলো
app.listen(env_js_1.config.port, () => {
    (0, logger_js_1.logMessage)(`Server listening on port ${env_js_1.config.port} in [${env_js_1.config.env}] mode`);
});

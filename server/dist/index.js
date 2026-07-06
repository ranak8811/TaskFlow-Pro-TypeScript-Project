"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_js_1 = require("./config/env.js");
const logger_middleware_js_1 = require("./middlewares/logger.middleware.js");
const error_middleware_js_1 = require("./middlewares/error.middleware.js"); // এরর মিডলওয়্যার ইম্পোর্ট
const task_routes_js_1 = __importDefault(require("./routes/task.routes.js"));
const logger_js_1 = require("./utils/logger.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_middleware_js_1.requestLogger);
app.use("/api/tasks", task_routes_js_1.default);
// সকল এপিআই রাউটের সর্বশেষে গ্লোবাল এরর মিডলওয়্যার যুক্ত করতে হবে
app.use(error_middleware_js_1.errorHandler);
app.listen(env_js_1.config.port, () => {
    (0, logger_js_1.logMessage)(`Server listening on port ${env_js_1.config.port}`);
});

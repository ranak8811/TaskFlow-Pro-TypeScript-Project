import express from "express";
import { config } from "./config/env.js";
import { requestLogger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js"; // এরর মিডলওয়্যার ইম্পোর্ট
import taskRouter from "./routes/task.routes.js";
import { logMessage } from "./utils/logger.js";

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use("/api/tasks", taskRouter);

// সকল এপিআই রাউটের সর্বশেষে গ্লোবাল এরর মিডলওয়্যার যুক্ত করতে হবে
app.use(errorHandler);

app.listen(config.port, () => {
  logMessage(`Server listening on port ${config.port}`);
});

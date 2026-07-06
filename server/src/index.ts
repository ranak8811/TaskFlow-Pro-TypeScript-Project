import express from "express";
import { config } from "./config/env.js";
import { requestLogger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import taskRouter from "./routes/task.routes.js";
import authRouter from "./routes/auth.routes.js"; // অথ রাউটস ইম্পোর্ট
import { logMessage } from "./utils/logger.js";

const app = express();
app.use(express.json());
app.use(requestLogger);

// রাউট মাউন্ট
app.use("/api/auth", authRouter); // অথ রাউট মাউন্ট হলো
app.use("/api/tasks", taskRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  logMessage(`Server listening on port ${config.port}`);
});

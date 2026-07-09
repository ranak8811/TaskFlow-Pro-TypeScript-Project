import express from "express";
import cors from "cors"; // ১. সিওআরএস ইম্পোর্ট করলাম
import { config } from "./config/env.js";
import { requestLogger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import taskRouter from "./routes/task.routes.js";
import authRouter from "./routes/auth.routes.js";
import { logMessage } from "./utils/logger.js";

const app = express();

// ২. এক্সপ্রেস রিকোয়েস্ট পার্স করার পূর্বেই CORS এনাবেল করলাম
app.use(
  cors({
    origin: "http://localhost:5173", // রিঅ্যাক্ট ক্লায়েন্টের লোকাল ইউআরএল
    credentials: true, // কুকি বা অথ হেডার পাস করার পারমিশন
  }),
);

app.use(express.json());
app.use(requestLogger);

// রাউট মাউন্ট
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  logMessage(`Server listening on port ${config.port}`);
});

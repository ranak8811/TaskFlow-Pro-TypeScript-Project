import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import workspaceRouter from "./routes/workspace.routes.js"; // ১. ওয়ার্কস্পেস রাউটার ইম্পোর্ট
import { errorHandler } from "./middlewares/error.middleware.js"; // ২. এরর হ্যান্ডলার ইম্পোর্ট

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// রাউটসমূহ মাউন্ট
app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspaceRouter); // ৩. /api/workspaces মাউন্ট করলাম

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "TaskFlow Pro Backend is running!",
  });
});

// ৪. সবশেষে গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[INFO] Server listening on port ${PORT}`);
});

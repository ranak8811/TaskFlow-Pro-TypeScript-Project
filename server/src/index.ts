import express from "express";
import type { Request, Response } from "express";
import authRouter from "./routes/auth.routes.js"; // ১. অথ রাউটার ইম্পোর্ট

const app = express();
const PORT = 3000;

app.use(express.json());

// ২. অথ রাউট মাউন্ট করলাম
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "TaskFlow Pro Backend is running!",
  });
});

app.listen(PORT, () => {
  console.log(`[INFO] Server listening on port ${PORT}`);
});

import express, { Request, Response } from "express";
import { config } from "./config/env.js"; // কাস্টম কনফিগ ইম্পোর্ট করলাম
import { logMessage } from "./utils/logger.js";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TaskFlow Pro API is running!" });
});

// কনফিগ থেকে টাইপ-সেফ পোর্ট রিড করা হলো
app.listen(config.port, () => {
  logMessage(`Server listening on port ${config.port} in [${config.env}] mode`);
});

import express from "express";
import type { Request, Response } from "express"; // টাইপ ইম্পোর্ট

const app = express();
const PORT = 3000;

app.use(express.json());

// বেসিক চেক রাউট
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "TaskFlow Pro Backend is running!",
  });
});

app.listen(PORT, () => {
  console.log(`[INFO] Server listening on port ${PORT}`);
});

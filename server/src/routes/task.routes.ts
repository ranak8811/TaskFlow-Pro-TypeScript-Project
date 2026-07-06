import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js"; // অথ মিডলওয়্যার ইম্পোর্ট

const router = Router();

// GET রাউট প্রোটেক্টেড করা হলো
router.get("/", authenticateUser, getTasks);
router.post("/", createTask);

export default router;

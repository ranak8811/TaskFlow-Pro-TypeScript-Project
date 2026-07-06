import { Router } from "express";
import { createTask, getTaskDetails } from "../controllers/task.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/tasks/:id (প্রোটেক্টেড)
router.get("/:id", authenticateUser, getTaskDetails);

// POST /api/tasks (প্রোটেক্টেড)
router.post("/", authenticateUser, createTask);

export default router;

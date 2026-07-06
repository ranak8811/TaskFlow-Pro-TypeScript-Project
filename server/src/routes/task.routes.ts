import { Router } from "express";
import { createTask, getTaskDetails } from "../controllers/task.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js"; // ভ্যালিডেশন মিডলওয়্যার
import { createTaskSchema } from "../schemas/task.schema.js"; // স্কিমা ইম্পোর্ট

const router = Router();

router.get("/:id", authenticateUser, getTaskDetails);

// রাউটে ভ্যালিডেশন মিডলওয়্যার ম্যাপ করা হলো
router.post(
  "/",
  authenticateUser,
  validateBody(createTaskSchema), // রিকোয়েস্ট চেক করবে
  createTask,
);

export default router;

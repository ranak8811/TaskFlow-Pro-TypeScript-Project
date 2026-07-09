import { Router } from "express";
import {
  createTask,
  getTaskDetails,
  getTasks, // ইম্পোর্ট যোগ করলাম
  updateTaskStatus, // ইম্পোর্ট যোগ করলাম
} from "../controllers/task.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import {
  createTaskSchema,
  updateTaskStatusSchema,
} from "../schemas/task.schema.js"; // স্কিমা ইম্পোর্ট

const router = Router();

// ১. সব টাস্ক রিড করার রাউট (GET /api/tasks)
router.get("/", authenticateUser, getTasks);

router.get("/:id", authenticateUser, getTaskDetails);

router.post("/", authenticateUser, validateBody(createTaskSchema), createTask);

// ২. স্ট্যাটাস আপডেট করার রাউট (PATCH /api/tasks/:id)
router.patch(
  "/:id",
  authenticateUser,
  validateBody(updateTaskStatusSchema), // আপডেট বডি ভ্যালিডেশন
  updateTaskStatus,
);

export default router;

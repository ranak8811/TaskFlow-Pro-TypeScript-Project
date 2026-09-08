import { Router } from "express";
import {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  addMemberToWorkspace,
} from "../controllers/workspace.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  addMemberSchema,
} from "../schemas/workspace.schema.js";

const router = Router();

// প্রতিটি ওয়ার্কস্পেস এন্ডপয়েন্টে অথেন্টিকেশন বাধ্যতামূলক
router.use(authenticateUser);

// ১. ক্রিয়েট ও লিস্ট রাউট
router.post("/", validateBody(createWorkspaceSchema), createWorkspace);
router.get("/", getMyWorkspaces);

// ২. নির্দিষ্ট ওয়ার্কস্পেস ভিউ, আপডেট ও ডিলিট
router.get("/:id", getWorkspaceById);
router.patch("/:id", validateBody(updateWorkspaceSchema), updateWorkspace);
router.delete("/:id", deleteWorkspace);

// ৩. মেম্বারশিপ ম্যানেজমেন্ট
router.post(
  "/:id/members",
  validateBody(addMemberSchema),
  addMemberToWorkspace,
);

export default router;

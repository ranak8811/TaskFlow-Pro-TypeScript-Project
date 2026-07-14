import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

const router = Router();

// সাইন-আপ পোস্ট এপিআই রাউট ম্যাপ করলাম
router.post("/signup", signup);

export default router;

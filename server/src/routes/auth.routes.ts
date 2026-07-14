import { Router } from "express";
import { signup, login, refresh } from "../controllers/auth.controller.js"; // নতুন ইম্পোর্ট

const router = Router();

router.post("/signup", signup);

// নতুন রাউট গেটওয়ে দুটি ম্যাপ করলাম
router.post("/login", login);
router.post("/refresh", refresh);

export default router;

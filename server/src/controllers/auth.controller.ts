import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

// সাইন-আপ কন্ট্রোলার মেথড
export async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password, name } = req.body;

    // ১. প্রারম্ভিক ইনপুট ভ্যালিডেশন চেক
    if (!email || !password || !name) {
      res
        .status(400)
        .json({ error: "Missing required fields (email, password, name)" });
      return;
    }

    // ২. ইমেইল ডুপ্লিকেশন চেক
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists with this email" });
      return;
    }

    // ৩. পাসওয়ার্ড সুরক্ষিত হ্যাশ তৈরি
    const passwordHash = await bcrypt.hash(password, 10);

    // ৪. ডাটাবেজে ইউজার স্টোর
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "MEMBER", // ডিফল্ট রোল MEMBER সেট করলাম
      },
    });

    // ৫. সেশন টোকেনসমূহ জেনারেট করলাম
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ৬. রেসপন্স ব্যাক করলাম
    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error); // গ্লোবাল এরর হ্যান্ডলারে ফরোয়ার্ড করলাম
  }
}

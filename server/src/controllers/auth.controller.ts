import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // জেডব্লিউটি ইম্পোর্ট করলাম
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

// ২. লগইন কন্ট্রোলার মেথড
export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Missing email or password" });
      return;
    }

    // ডেটাবেজে ইমেইল মিলিয়ে ইউজার লোড করলাম
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // পাসওয়ার্ড হ্যাশ কম্পেয়ার করলাম
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // নতুন টোকেনসমূহ জেনারেট করলাম
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "Logged in successfully",
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
    next(error);
  }
}

// ৩. সেশন রিকভারি বা রিফ্রেশ টোকেন কন্ট্রোলার মেথড
export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    // রিফ্রেশ টোকেন ভেরিফাই করে টাইপ কাস্টিং করলাম
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    ) as { id: string };

    // টোকেনে থাকা ইউজার আইডি ডাটাবেজে মিলিয়ে নিলাম
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      res.status(401).json({ error: "User session expired or not found" });
      return;
    }

    // কেবল নতুন অ্যাক্সেস টোকেন রিটার্ন করলাম
    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}

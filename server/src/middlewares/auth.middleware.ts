import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db.js"; // প্রিজমা ইম্পোর্ট

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    // ডাটাবেজে মক ইউজার আইডি 'usr-101' সিঙ্ক করা হচ্ছে (ফরেন কি এরর এড়াতে)
    // upsert মেথডটি ডাটা থাকলে কিছু করে না, না থাকলে তৈরি করে
    await prisma.user.upsert({
      where: { email: "anwar@example.com" },
      update: {},
      create: {
        id: "usr-101",
        name: "Anwar Hossain",
        email: "anwar@example.com",
      },
    });

    req.user = {
      id: "usr-101",
      role: "admin",
    };

    next();
  } catch (error) {
    next(error);
  }
}

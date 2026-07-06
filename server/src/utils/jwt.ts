import jwt from "jsonwebtoken";
import { AppError } from "./app-error.js";
import { UserRole } from "../types/user.js";

// ১. পে-লোড ইন্টারফেস ডিক্লেয়ার করলাম
export interface UserPayload {
  id: string;
  role: UserRole;
}

// ২. অ্যাক্সেস টোকেন তৈরি করার মেথড
export function generateAccessToken(payload: UserPayload): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
}

// ৩. রিফ্রেশ টোকেন তৈরি করার মেথড
export function generateRefreshToken(payload: UserPayload): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}

// ৪. টোকেন ডিকোড ও ভেরিফাই করার মেথড
export function verifyToken(token: string, secret: string): UserPayload {
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
}

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { config } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  // হেডার ফরম্যাট চেক (Bearer Token)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Authentication token is missing or malformed", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    // অ্যাক্সেস সিক্রেট দিয়ে টোকেন ডিকোড ও ভেরিফাই করলাম
    const decoded = verifyToken(token, config.jwtAccessSecret);

    // req.user এ ডিকোড করা ইউজার পেলোড সেট করলাম
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

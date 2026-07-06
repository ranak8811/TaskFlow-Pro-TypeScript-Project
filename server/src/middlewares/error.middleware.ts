import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { logMessage } from "../utils/logger.js";

// গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার (প্যারামিটার ৪টি হওয়া বাধ্যতামূলক)
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // instanceof টাইপ গার্ড দিয়ে চেক করা হলো এটি আমাদের তৈরি কাস্টম এরর কি না
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  logMessage(`[API ERROR] ${statusCode} - ${err.message}`, true);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

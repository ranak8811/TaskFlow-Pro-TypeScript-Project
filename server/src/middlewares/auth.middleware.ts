import { Request, Response, NextFunction } from "express";

// ইউজার অথেন্টিকেশন চেক করার মিডলওয়্যার
export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  // হেডার ও টোকেন ফরমেট চেক
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Access token is missing or invalid",
    });
    return; // কাজ শেষ, পরবর্তী চেইনে যাবে না
  }

  // মক টোকেন ডিকোডিং ভ্যালু (বাস্তবে এখানে JWT ভেরিফিকেশন হবে)
  req.user = {
    id: "usr-101",
    role: "admin", // req.user এখন টাইপস্ক্রিপ্টে বৈধ
  };

  next(); // সাকসেসফুল হলে পরবর্তী কন্ট্রোলারে যাবে
}

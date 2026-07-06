import { UserRole } from "./user.js";

// এক্সপ্রেস গ্লোবাল নেমস্পেসের রিকোয়েস্ট অবজেক্টকে বর্ধিত করা হলো
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole; // আমাদের পূর্বের তৈরি করা UserRole এনাম/টাইপ
      };
    }
  }
}

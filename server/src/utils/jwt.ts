import jwt from "jsonwebtoken";

// ১. জেডব্লিউটি পে-লোডের টাইপ ইন্টারফেস
interface UserPayload {
  id: string;
  email: string;
  role: string;
}

// ২. অ্যাক্সেস টোকেন জেনারেট করার মেথড
export function generateAccessToken(user: UserPayload): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET || "default_access_secret",
    { expiresIn: "15m" }, // ১৫ মিনিট মেয়াদ
  );
}

// ৩. রিফ্রেশ টোকেন জেনারেট করার মেথড
export function generateRefreshToken(user: { id: string }): string {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    { expiresIn: "7d" }, // ৭ দিন মেয়াদ
  );
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      DATABASE_URL: string;
      NODE_ENV: "development" | "production" | "test"; // লিটারেল ইউনিয়ন টাইপ
    }
  }
}

// ফাইলটিকে একটি মডিউল হিসেবে গণ্য করতে এক্সপোর্ট স্টেটমেন্ট আবশ্যক
export {};

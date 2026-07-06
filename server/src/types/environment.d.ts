declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      DATABASE_URL: string;
      NODE_ENV: "development" | "production" | "test";
      JWT_ACCESS_SECRET: string; // অ্যাক্সেস টোকেন সিক্রেট টাইপ
      JWT_REFRESH_SECRET: string; // রিফ্রেশ টোকেন সিক্রেট টাইপ
    }
  }
}

export {};

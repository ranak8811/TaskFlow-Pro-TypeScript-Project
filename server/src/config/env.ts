import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  dbUrl: process.env.DATABASE_URL,
  env: process.env.NODE_ENV || "development",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET!, // সেফ এক্সপোর্ট
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!, // সেফ এক্সপোর্ট
};

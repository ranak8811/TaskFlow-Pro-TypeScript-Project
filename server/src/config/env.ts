import dotenv from "dotenv";
dotenv.config(); // .env ফাইল থেকে ভেরিয়েবলগুলো প্রসেসে লোড করা হলো

// পরিবেশ ভেরিয়েবলগুলো সেফলি এক্সপোর্ট করার অবজেক্ট
export const config = {
  // পোর্ট নম্বর স্ট্রিং থেকে ইন্টিজারে রূপান্তর করা হলো
  port: parseInt(process.env.PORT || "3000", 10),
  dbUrl: process.env.DATABASE_URL,
  env: process.env.NODE_ENV || "development",
};

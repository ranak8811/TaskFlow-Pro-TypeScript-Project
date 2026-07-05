import { logMessage } from "./utils/logger.js";
import { User } from "./types/user.js"; // ইউজার ইন্টারফেস ইম্পোর্ট করলাম

// User ইন্টারফেস অনুযায়ী একটি নতুন ইউজার অবজেক্ট তৈরি করলাম
const newUser: User = {
  id: "usr-101",
  name: "Anwar Hossain",
  email: "anwar@example.com",
  role: "admin", // bio অপশনাল হওয়ায় এখানে তা না দিলেও কোনো এরর নেই
};

logMessage(`Created user: ${newUser.name} with role: ${newUser.role}`);

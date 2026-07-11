// গ্লোবাল ইউজার প্রোফাইল ইন্টারফেস
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  phoneNumber?: string;
}

// ১. Partial - প্রোফাইল আপডেট করার সময় সব ফিল্ড অপশনাল
export type UpdateProfileInput = Partial<UserProfile>;

// ২. Pick - পাবলিক ড্যাশবোর্ডে দেখানোর জন্য শুধু নাম ও ইমেইল বেছে নিলাম
export type PublicProfile = Pick<UserProfile, "name" | "email">;

// ৩. Omit - নতুন প্রোফাইল তৈরির সময় আইডি থাকবে না (ডিবি অটো জেনারেট করবে)
export type CreateProfileInput = Omit<UserProfile, "id">;

// ৪. Record - রোল অনুযায়ী সিস্টেম পারমিশন ম্যাপ
export const rolePermissions: Record<"admin" | "member", string[]> = {
  admin: ["create_task", "delete_task", "manage_users"],
  member: ["create_task"],
};

// ৫. Readonly - কনফিগ ডাটা যা রানটাইমে পরিবর্তন করা যাবে না
const systemConfig: Readonly<{ apiVersion: string }> = {
  apiVersion: "v1.0.0",
};

// --- ব্যবহারের পরীক্ষা ---
const updateData: UpdateProfileInput = {
  name: "Anwar Hossain", // ইমেইল বা আইডি ছাড়া কেবল নাম পাঠানো বৈধ
};

const publicUser: PublicProfile = {
  name: "Rahman",
  email: "rahman@example.com", // আইডি বা রোল এখানে এক্সেস করা যাবে না
};

const newUserData: CreateProfileInput = {
  name: "New User",
  email: "new@example.com",
  role: "member", // এখানে id প্রপার্টি পাস করলে কম্পাইলার এরর দিবে
};

console.log(`Update Input Keys: ${Object.keys(updateData)}`);
console.log(`Public User: ${publicUser.name} (${publicUser.email})`);
console.log(`Admin Permissions: ${rolePermissions.admin.join(", ")}`);
console.log(`System Config Version: ${systemConfig.apiVersion}`);

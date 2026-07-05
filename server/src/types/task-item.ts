// ১. Priority-র জন্য লিটারেল টাইপ ইউনিয়ন তৈরি করলাম
export type Priority = "LOW" | "MEDIUM" | "HIGH";

// ২. ডাটাবেজ মেটাডাটার জন্য ইন্টারফেস
export interface Identifiable {
  readonly id: string | number; // ইউনিয়ন টাইপ (string অথবা number)
  createdAt: string;
}

// ৩. টাস্কের আসল তথ্যের ইন্টারফেস
export interface TaskDetails {
  title: string;
  priority: Priority; // লিটারেল টাইপ ব্যবহার করা হলো
}

// ৪. ইন্টারসেকশন টাইপ (Intersection Type): দুটি টাইপকে কম্বাইন করা হলো
export type TaskItem = Identifiable & TaskDetails;

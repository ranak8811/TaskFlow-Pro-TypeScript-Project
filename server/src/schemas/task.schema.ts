import { z } from "zod";

// ১. টাস্ক তৈরি করার Zod স্কিমা ডিফাইন করলাম
export const createTaskSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title is too long"),
});

// ২. Zod Inference: স্কিমা থেকে টাইপ জেনারেট করলাম
export type CreateTaskInput = z.infer<typeof createTaskSchema>;

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

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

// ৩. টাস্ক স্ট্যাটাস আপডেট করার নতুন Zod স্কিমা
export const updateTaskStatusSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"], {
    message: "Status must be TODO, IN_PROGRESS, or DONE",
  }),
});

// ৪. স্কিমা থেকে আপডেট ইনপুট টাইপ ইনফার করলাম
export type UpdateTaskStatusInput = z.infer<typeof updateTaskStatusSchema>;

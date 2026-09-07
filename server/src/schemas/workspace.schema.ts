import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string({
      message: "Workspace name is required",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().max(200).optional(),
});

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;

export const addMemberSchema = z.object({
  email: z.email("Valid user email is required"),
});

export type AddMemberInput = z.infer<typeof addMemberSchema>;

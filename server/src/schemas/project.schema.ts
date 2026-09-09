import z from "zod";

export const createProjectSchema = z.object({
  name: z
    .string({
      message: "Project name is required",
    })
    .min(2, "Project name must be at least 2 characters")
    .max(60, "Project name cannot exceed 60 characters"),
  description: z
    .string()
    .max(300, "Description cannot exceed 300 characters")
    .optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  description: z.string().max(300).optional(),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

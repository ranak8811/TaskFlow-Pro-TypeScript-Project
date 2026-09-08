import { prisma } from "../config/db.js";
import { Task } from "../generated/client/client.js";

export class TaskRepository {
  static async create(
    title: string,
    projectId: string,
    assigneeId?: string,
  ): Promise<Task> {
    return prisma.task.create({
      data: {
        title,
        projectId,
        ...(assigneeId && { assigneeId }),
      },
    });
  }

  static async findByUserId(assigneeId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        assigneeId,
      },
    });
  }

  static async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  // ৪. ডাটাবেজে স্ট্যাটাস আপডেট করার কোয়েরি মেথড
  static async updateStatus(
    id: string,
    status: "TODO" | "IN_PROGRESS" | "DONE",
  ): Promise<Task> {
    return prisma.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}

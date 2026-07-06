import { TaskRepository } from "../repositories/task.repository.js";
import { AppError } from "../utils/app-error.js";
import { Task } from "../generated/client/client.js";

export class TaskService {
  // ১. নতুন টাস্ক তৈরি করার বিজনেস লজিক
  static async createNewTask(title: string, userId: string): Promise<Task> {
    // বিজনেস ভ্যালিডেশন
    if (!title.trim()) {
      throw new AppError("Task title cannot be empty", 400);
    }
    return TaskRepository.create(title, userId);
  }

  // ২. আইডি দিয়ে টাস্ক গেট করার লজিক (না পেলে এরর)
  static async getTaskById(id: string): Promise<Task> {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new AppError("Requested task was not found", 404);
    }
    return task;
  }
}

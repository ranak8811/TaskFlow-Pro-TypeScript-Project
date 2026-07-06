import { RequestHandler } from "express";
import { TaskService } from "../services/task.service.js"; // সার্ভিস ইম্পোর্ট

interface CreateTaskBody {
  title: string;
}

// টাস্ক তৈরি করার কন্ট্রোলার
export const createTask: RequestHandler<{}, {}, CreateTaskBody> = async (
  req,
  res,
  next,
) => {
  try {
    const { title } = req.body;
    const currentUser = req.user!; // auth middleware থেকে প্রাপ্ত ইউজার

    // সার্ভিস লেয়ারের সাহায্যে টাস্ক তৈরি
    const newTask = await TaskService.createNewTask(title, currentUser.id);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    next(error); // এরর ঘটলে গ্লোবাল এরর হ্যান্ডলারে ফরওয়ার্ড
  }
};

// টাস্ক আইডি দিয়ে ডিটেইলস গেট করার কন্ট্রোলার
export const getTaskDetails: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params; // ইউআরএল ডায়নামিক আইডি

    const task = await TaskService.getTaskById(id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

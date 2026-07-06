import { RequestHandler } from "express";
import { TaskService } from "../services/task.service.js";
import { CreateTaskInput } from "../schemas/task.schema.js"; // জোড ইনফার টাইপ ইম্পোর্ট

// ৩ নম্বর জেনেরিক পজিশনে CreateTaskInput টাইপটি বসালাম
export const createTask: RequestHandler<{}, {}, CreateTaskInput> = async (
  req,
  res,
  next,
) => {
  try {
    // req.body এখন Zod ভ্যালিডেটেড টাইপ
    const { title } = req.body;
    const currentUser = req.user!;

    const newTask = await TaskService.createNewTask(title, currentUser.id);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskDetails: RequestHandler<{ id: string }> = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const task = await TaskService.getTaskById(id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

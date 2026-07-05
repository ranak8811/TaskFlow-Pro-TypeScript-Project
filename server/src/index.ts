import { logMessage } from "./utils/logger.js";
import { Task, TaskStatus } from "./types/task.js"; // টাস্ক এবং এনাম ইম্পোর্ট করলাম

// Task ইন্টারফেস এবং এনাম ব্যবহার করে একটি নতুন টাস্ক অবজেক্ট তৈরি করলাম
const myTask: Task = {
  id: "tsk-201",
  title: "Setup Database Schema",
  status: TaskStatus.InProgress, // এনাম ভ্যালু ব্যবহার করলাম
  tags: ["database", "prisma", "postgres"], // স্ট্রিং অ্যারে
  assignee: ["usr-101", "Anwar Hossain"], // টাপল: [ID, Name]
};

logMessage(`Task "${myTask.title}" is currently: ${myTask.status}`);
logMessage(`Assigned to: ${myTask.assignee[1]} (ID: ${myTask.assignee[0]})`);

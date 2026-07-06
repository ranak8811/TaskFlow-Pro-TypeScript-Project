import { logMessage } from "./logger.js";

// ১. Optional এবং Default Parameter সহ ফাংশন
export function createTask(
  title: string,
  description?: string, // প্রশ্নবোধক চিহ্ন (?) মানে এটি অপশনাল প্যারামিটার
  priority: string = "MEDIUM", // ডিফল্ট ভ্যালু সেট করা হলো
) {
  return {
    title,
    description: description || "No description provided",
    priority,
  };
}

// ২. Callback ফাংশন টাইপিং
export function processTasks(
  tasks: string[],
  onComplete: (completedTask: string) => void, // কলব্যাক ফাংশনের টাইপ সিগনেচার
): void {
  for (const task of tasks) {
    logMessage(`Processing task: ${task}`);
    onComplete(task); // কলব্যাক ফায়ার করা হলো
  }
}

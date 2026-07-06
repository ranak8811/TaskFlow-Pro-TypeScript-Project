import { createTask, processTasks } from "./utils/task-processor.js";
import { logMessage } from "./utils/logger.js";

// createTask কল করা হচ্ছে (ডিফল্ট ও অপশনাল টেস্ট করা)
const t1 = createTask("Setup Express"); // description ও priority ছাড়াই
const t2 = createTask("Configure Router", "Set up backend routing", "HIGH"); // সব প্যারামিটার সহ

logMessage(`Task 1: ${t1.title} (Priority: ${t1.priority})`);
logMessage(
  `Task 2: ${t2.title} (Priority: ${t2.priority}) - ${t2.description}`,
);

const myTasks = ["Database Setup", "Auth Middleware"];

// processTasks কল করা এবং কলব্যাক পাস করা
processTasks(myTasks, (completed) => {
  logMessage(`Callback: Completed "${completed}" successfully!`);
});

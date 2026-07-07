import { useState } from "react";
import type React from "react";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";
import TaskCard, { type Task } from "./components/TaskCard.tsx";

export default function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete TypeScript Setup", status: "TODO" },
  ]);

  // ইনপুট চেঞ্জ ইভেন্ট হ্যান্ডলার টাইপড
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskName(e.target.value);
    if (error) setError("");
  };

  // ফর্ম সাবমিট ইভেন্ট হ্যান্ডলার টাইপড
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError("Task title is required");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskName,
      status: "TODO",
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskName("");
  };

  // কলব্যাক হ্যান্ডলার টাইপড
  const handleStatusChange = (
    id: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE",
  ): void => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-400">
            TaskFlow Pro
          </h1>
          <p className="text-slate-400">
            Component & Event Typing Demonstration
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4"
        >
          <Input
            label="New Task Title"
            placeholder="Type your task here..."
            value={taskName}
            onChange={handleInputChange}
            error={error}
          />
          <Button type="submit" variant="primary" className="w-full">
            Add Task
          </Button>
        </form>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-300">Task List</h2>
          {tasks.length === 0 ? (
            <p className="text-slate-500 text-sm">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

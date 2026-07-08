import { useState, useRef, useMemo, useCallback } from "react";
import type React from "react";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";
import TaskCard, { type Task } from "./components/TaskCard.tsx";

export default function App() {
  // ১. useState Typing - জেনেরিক টাইপ ডিফাইন করলাম
  const [taskName, setTaskName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete TypeScript Setup", status: "TODO" },
  ]);

  // ২. useRef Typing - DOM রেফারেন্স এর টাইপ নির্ধারণ করলাম
  const inputRef = useRef<HTMLInputElement>(null);

  // ৩. useMemo Typing - কাস্টম টাইপ ও কন্ডিশনাল মেমোরি ক্যাশ লজিক
  const filteredTasks = useMemo<Task[]>(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tasks, searchQuery]);

  // ৪. useCallback Typing - ফাংশন মেমোরি রিকোয়েস্ট ও টাইপড প্যারামিটার
  const handleStatusChange = useCallback(
    (id: string, newStatus: "TODO" | "IN_PROGRESS" | "DONE"): void => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      );
    },
    [],
  );

  // ইনপুট ফোকাস মেথড (useRef.current এর সেফটি চেক সহ)
  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskName(e.target.value);
    if (error) setError("");
  };

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
    focusInput(); // ফর্ম সাবমিট শেষে অটোমেটিক ইনপুটে ফোকাস চলে যাবে
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-400">
            TaskFlow Pro
          </h1>
          <p className="text-slate-400">Hooks Typing Demonstration</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4"
        >
          <Input
            ref={inputRef} // কাস্টম ইনপুট কম্পোনেন্টে ref পাস করলাম
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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-300">Task List</h2>
            <button
              onClick={focusInput}
              className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Focus Input
            </button>
          </div>

          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {filteredTasks.length === 0 ? (
            <p className="text-slate-500 text-sm">No matching tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
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

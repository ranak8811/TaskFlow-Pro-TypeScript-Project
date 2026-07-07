import type React from "react";

// টাস্ক অবজেক্ট টাইপ ইন্টারফেস
export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

// প্রপস ইন্টারফেস ডিফাইন করলাম
interface TaskCardProps {
  task: Task;
  onStatusChange: (
    id: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE",
  ) => void; // টাইপড কলব্যাক
}

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  // মাউস ক্লিক ইভেন্ট টাইপ করা হলো
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const nextStatus = task.status === "DONE" ? "TODO" : "DONE";
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 w-full max-w-md">
      <div className="space-y-1">
        <h3
          className={`font-medium ${
            task.status === "DONE"
              ? "line-through text-slate-500"
              : "text-slate-200"
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium ${
            task.status === "DONE"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {task.status}
        </span>
      </div>
      <button
        onClick={handleToggle}
        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 cursor-pointer"
      >
        Toggle Status
      </button>
    </div>
  );
}

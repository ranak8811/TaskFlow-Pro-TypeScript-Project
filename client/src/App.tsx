import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";
import TaskCard from "./components/TaskCard.tsx";
import { taskApi } from "./utils/task-api.ts";
import { useAppStore } from "./store/useAppStore.ts"; // জুস্ট্যান্ড ইম্পোর্ট

// ১. জোড ফর্ম স্কিমা ডিফাইন করলাম
const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters")
    .max(50, "Task title cannot exceed 50 characters"),
});

// ২. জোড স্কিমা থেকে ডাইনামিকালি ফর্মের টাইপ ইনফার করলাম
type TaskFormData = z.infer<typeof taskFormSchema>;

export default function App() {
  const queryClient = useQueryClient();

  // ৩. জুস্ট্যান্ড গ্লোবাল স্টেট রিসিভ করলাম
  const { theme, toggleTheme } = useAppStore();

  // ৪. React Hook Form ও Zod Resolver বাইন্ডিং
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
  });

  const { data: tasks = [], isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset(); // ফর্ম সফলভাবে জমা হওয়ার পর ফিল্ডসমূহ রিসেট করলাম
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "TODO" | "IN_PROGRESS" | "DONE";
    }) => taskApi.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // RHF এর অন-সাবমিট হ্যান্ডলার
  const onSubmit = (data: TaskFormData): void => {
    createTaskMutation.mutate(data.title);
  };

  const handleStatusChange = (
    id: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE",
  ): void => {
    updateTaskMutation.mutate({ id, status: newStatus });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-955 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1
              className={`text-3xl font-extrabold tracking-tight ${
                theme === "dark" ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              TaskFlow Pro
            </h1>
            <p
              className={theme === "dark" ? "text-slate-400" : "text-slate-600"}
            >
              Zustand & React Hook Form
            </p>
          </div>
          {/* থিম পরিবর্তন করার বোতাম */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white cursor-pointer hover:bg-slate-700"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`border p-6 rounded-2xl space-y-4 shadow-xl ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {/* RHF register দিয়ে ইনপুটকে বাইন্ড করলাম */}
          <Input
            label="New Task Title"
            placeholder="Type your task here..."
            error={errors.title?.message}
            {...register("title")}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={createTaskMutation.isPending}
          >
            {createTaskMutation.isPending ? "Adding..." : "Add Task"}
          </Button>
        </form>

        <div className="space-y-3">
          <h2
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Task List
          </h2>
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

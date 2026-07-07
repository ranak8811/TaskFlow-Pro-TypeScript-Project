import type { InputHTMLAttributes } from "react";

// ইনপুটের নিজস্ব প্রপস ও নেটিভ অ্যাট্রিবিউট ইন্টারফেস এক্সটেন্ড করলাম
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}
      <input
        className={`px-4 py-2.5 bg-slate-900 border ${
          error
            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
            : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
        } rounded-xl text-white focus:outline-none focus:ring-4 transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

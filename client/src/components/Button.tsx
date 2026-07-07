import type { ButtonHTMLAttributes } from "react";

// বাটনের নিজস্ব প্রপস ও নেটিভ অ্যাট্রিবিউট ইন্টারফেস এক্সটেন্ড করলাম
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "px-4 py-2 rounded-xl font-medium transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

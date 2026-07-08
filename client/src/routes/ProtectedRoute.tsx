import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext.tsx";

interface ProtectedRouteProps {
  children: ReactNode; // চাইল্ড নোড টাইপ ডিক্লেয়ার করলাম
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth(); // গ্লোবাল অথ স্টেট রিড করলাম

  // লোডিং স্টেটে স্পিনার বা মক টেক্সট দেখাব
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );
  }

  // ইউজার অবজেক্ট নাল হলে লগইন পেজে রিডাইরেক্ট করব
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ইউজার অথরাইজড হলে চাইল্ড ইলিমেন্ট রেন্ডার হবে
  return <>{children}</>;
}

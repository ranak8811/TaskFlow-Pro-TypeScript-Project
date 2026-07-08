import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type React from "react";
import { useAuth } from "../context/AuthContext.tsx";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";

export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // নেভিগেশন হুক

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    try {
      await login(email); // কনটেক্সট লগইন কল করলাম
      navigate("/", { replace: true }); // সফল লগইন শেষে হোমে রিডাইরেক্ট
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center text-indigo-400">
          Login
        </h1>
        <Input
          label="Email Address"
          type="email"
          placeholder="yourname@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

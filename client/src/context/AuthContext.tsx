import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { api } from "../utils/api.ts"; // ১. আমাদের টাইপ-সেফ এক্সিওস ক্লায়েন্ট ইম্পোর্ট করলাম

export interface User {
  id: string;
  email: string;
  role: "admin" | "member";
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ২. রিয়াল লগইন মেথড কনফিগার করলাম
  const login = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // ব্যাকএন্ডের রিয়াল লগইন এপিআই কল করলাম
      const response = await api.post<{
        success: boolean;
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }>("/auth/login", { email });

      const { accessToken, refreshToken } = response.data.data;

      // সঠিক টোকেনসমূহ লোকাল স্টোরেজে সেট করলাম
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setUser({
        id: "usr-101",
        email,
        role: "admin",
      });
    } catch (err) {
      console.error("Login Error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

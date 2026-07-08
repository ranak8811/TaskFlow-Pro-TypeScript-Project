import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// ১. ইউজারের ডাটা টাইপ ইন্টারফেস
export interface User {
  id: string;
  email: string;
  role: "admin" | "member";
}

// ২. কনটেক্সটের স্টেট ও মেথড সমূহের ইন্টারফেস
interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// ৩. createContext তৈরি করলাম (প্রাথমিক মান null সেট করে)
const AuthContext = createContext<AuthContextType | null>(null);

// ৪. কাস্টম প্রোভাইডার কম্পোনেন্ট
interface AuthProviderProps {
  children: ReactNode; // চিলড্রেন টাইপ ডিক্লেয়ার করলাম
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // মক লগইন মেথড টাইপড
  const login = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      setUser({
        id: "usr-101",
        email,
        role: "admin",
      });
      localStorage.setItem("accessToken", "mock-access-token");
      localStorage.setItem("refreshToken", "mock-refresh-token");
    } finally {
      setIsLoading(false);
    }
  };

  // লগআউট মেথড টাইপড
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

// ৫. টাইপ-সেফ গার্ড কাস্টম হুক
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // এখানে টাইপস্ক্রিপ্ট গ্যারান্টি দেয় যে context null নয়
}

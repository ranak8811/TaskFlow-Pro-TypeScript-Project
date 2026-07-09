import { create } from "zustand";

// ১. স্টোরের স্টেট ও অ্যাকশন সমূহের ইন্টারফেস
interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// ২. create মেথড দিয়ে টাইপড স্টোর তৈরি করলাম
export const useAppStore = create<AppState>((set) => ({
  theme: "dark", // ডিফল্ট থিম ডার্ক
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

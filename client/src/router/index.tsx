import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";

// ১. createBrowserRouter ব্যবহার করে অ্যাপ্লিকেশন রাউট ডিফাইন করলাম
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // হোম রাউট হিসেবে App মাউন্ট করলাম
  },
]);

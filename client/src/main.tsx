import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { AuthProvider } from "./context/AuthContext.tsx"; // প্রোভাইডার ইম্পোর্ট
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* সমগ্র রাউটারকে অথ প্রোভাইডার দিয়ে মুড়ে দিলাম */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

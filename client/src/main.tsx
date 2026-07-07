import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // রাউটার প্রোভাইডার
import { router } from "./router/index.tsx"; // তৈরি করা রাউটার
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* RouterProvider এর মাধ্যমে রাউটার একটিভেট করা হলো */}
    <RouterProvider router={router} />
  </StrictMode>,
);

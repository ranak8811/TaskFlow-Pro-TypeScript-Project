import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Login from "../pages/Login.tsx";
import ProtectedRoute from "../routes/ProtectedRoute.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // পাবলিক রাউট
  },
  {
    path: "/",
    element: (
      // হোম রাউটকে প্রটেক্টেড রাউট গার্ড দিয়ে র‍্যাপ করলাম
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

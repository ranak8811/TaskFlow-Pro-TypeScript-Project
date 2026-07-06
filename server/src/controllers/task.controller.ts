import { RequestHandler } from "express";
import { AppError } from "../utils/app-error.js"; // AppError ইম্পোর্ট করলাম

interface CreateTaskBody {
  title: string;
}

export const createTask: RequestHandler<{}, {}, CreateTaskBody> = (
  req,
  res,
) => {
  const { title } = req.body;
  res.status(201).json({ success: true, data: { id: "tsk-101", title } });
};

// টাস্ক গেট করার কন্ট্রোলার
export const getTasks: RequestHandler = (req, res, next) => {
  const currentUser = req.user;

  // টেস্ট করার জন্য কুয়েরি প্যারামিটার চেক করে এরর ট্রিগার করার লজিক
  if (req.query.error === "true") {
    // next() এর ভেতরে এরর অবজেক্ট পাঠালে এক্সপ্রেস সরাসরি গ্লোবাল এরর হ্যান্ডলারে চলে যায়
    return next(new AppError("Simulated database fail during task fetch", 400));
  }

  res.status(200).json({
    success: true,
    message: `Tasks fetched successfully for user: ${currentUser?.id}`,
    userRole: currentUser?.role,
    data: [],
  });
};

import { RequestHandler } from "express";

interface CreateTaskBody {
  title: string;
}

// টাস্ক তৈরি করার কন্ট্রোলার
export const createTask: RequestHandler<{}, {}, CreateTaskBody> = (
  req,
  res,
) => {
  const { title } = req.body;
  res.status(201).json({ success: true, data: { id: "tsk-101", title } });
};

// টাস্ক গেট করার প্রোটেক্টেড কন্ট্রোলার (নতুন যোগ হলো)
export const getTasks: RequestHandler = (req, res) => {
  // req.user এখন টাইপ-সেফ এবং অটোকমপ্লিট হবে
  const currentUser = req.user;

  res.status(200).json({
    success: true,
    message: `Tasks fetched successfully for user: ${currentUser?.id}`,
    userRole: currentUser?.role,
    data: [{ id: "tsk-01", title: "Learn TypeScript Merging", status: "TODO" }],
  });
};

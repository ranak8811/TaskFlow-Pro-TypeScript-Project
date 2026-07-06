import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

// জেনেরিক ভ্যালিডেশন মিডলওয়্যার (যেকোনো জোড স্কিমা ভ্যালিডেট করতে পারে)
export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // স্কিমা অনুযায়ী req.body ভ্যালিডেট ও পার্স করা হলো
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // জোডের সব এরর মেসেজ মার্জ করে রিডেবল স্ট্রিং বানালাম
        const errorMessages = error.issues
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");

        next(new AppError(errorMessages, 400));
      } else {
        next(error);
      }
    }
  };
}

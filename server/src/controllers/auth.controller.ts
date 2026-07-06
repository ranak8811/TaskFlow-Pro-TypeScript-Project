import { RequestHandler } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  UserPayload,
} from "../utils/jwt.js";
import { config } from "../config/env.js";
import { AppError } from "../utils/app-error.js";

// লগইন কন্ট্রোলার (মক ইউজার ডাটা অনুযায়ী টোকেন ইস্যু করবে)
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    const userPayload: UserPayload = {
      id: "usr-101",
      role: "admin",
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// টোকেন রিফ্রেশ কন্ট্রোলার (নতুন অ্যাক্সেস টোকেন ইস্যু করবে)
export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new AppError("Refresh token is required", 400);
    }

    const decoded = verifyToken(token, config.jwtRefreshSecret);

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

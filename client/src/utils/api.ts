import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// ১. বেস ইউআরএল টাইপ সেফলি গেট করলাম (import.meta.env এখন টাইপড)
const baseURL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// টোকেন রিফ্রেশ ট্র্যাকিং স্টেট
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

// ফেইল হওয়া রিকোয়েস্ট কিউ প্রসেস মেথড
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// ২. Request Interceptor: প্রতিটি রিকোয়েস্টে Bearer টোকেন যুক্ত করে
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ৩. Response Interceptor: ৪০১ এরর ও সাইলেন্ট রিফ্রেশ হ্যান্ডলিং
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // যদি এপিআই ৪০১ (Unauthorized) দেয় এবং এটি পূর্বে ট্রাই না করা হয়
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // যদি অলরেডি অন্য কোনো রিকোয়েস্ট রিফ্রেশ করতে থাকে, তবে এটিকে কিউতে পুশ করব
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // রিফ্রেশ টোকেন দিয়ে নতুন অ্যাক্সেস টোকেন জেনারেট রিকোয়েস্ট
        const response = await axios.post<{
          success: boolean;
          data: { accessToken: string };
        }>(`${baseURL}/auth/refresh`, {
          token: refreshToken,
        });

        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);

        // নতুন টোকেন দিয়ে কিউতে থাকা সব পেন্ডিং রিকোয়েস্ট রান করালাম
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // রিফ্রেশ ফেইল হলে লোকাল স্টোরেজ ক্লিয়ার করব
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

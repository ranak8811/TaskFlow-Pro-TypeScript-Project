import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios"; // টাইপ ইম্পোর্ট

// ১. রিকুয়েস্ট কিউ ও লকিং ভেরিয়েবল
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

// কিউ-তে থাকা রিকোয়েস্ট প্রসেস করার ফাংশন
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

// ২. এক্সিওস ইনস্ট্যান্স তৈরি করলাম
export const api = axios.create({
  baseURL: "http://localhost:3000/api", // ব্যাকএন্ড এক্সপ্রেস বেস এপিআই পাথ
  timeout: 10000,
});

// ৩. রিকুয়েস্ট ইন্টারসেপ্টর: টোকেন হেডার অটো-ইনজেক্ট
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization হেডার বসালাম
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ৪. রেসপন্স ইন্টারসেপ্টর: ৪০১ ক্যাচ ও সাইলেন্ট রিফ্রেশ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // টোকেন এরর বা ৪০১ Unauthorized হলে ট্রিগার হবে
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          // অলরেডি টোকেন রিফ্রেশ রানিং থাকলে এই রিকোয়েস্টকে কিউ-তে রাখলাম
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });

          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest); // টোকেন আসবামাত্র পুনরায় কল হবে
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true; // রি-লুপ প্রতিরোধ করতে ফ্ল্যাগ মার্ক করলাম
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        // রিফ্রেশ এপিআই কল করলাম
        const response = await axios.post<{ accessToken: string }>(
          "http://localhost:3000/api/auth/refresh",
          { refreshToken },
        );

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken); // নতুন টোকেন সেভ করলাম

        // গ্লোবাল ডিফল্ট হেডার আপডেট
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken); // কিউ-তে থাকা সবাইকে নতুন টোকেন ডিস্ট্রিবিউট করলাম

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest); // ফেইল হওয়া প্রথম রিকোয়েস্টটি রি-রান করলাম
      } catch (refreshError) {
        processQueue(refreshError, null);
        // রিফ্রেশ টোকেনও ইনভ্যালিড হলে সেশন ক্লিন করে লগইনে পাঠাব
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

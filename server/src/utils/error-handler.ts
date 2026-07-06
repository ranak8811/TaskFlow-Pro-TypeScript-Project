import { logMessage } from "./logger.js";

// void টাইপ: এটি কোনো ভ্যালু রিটার্ন করে না
export function processData(data: unknown): void {
  // typeof দিয়ে টাইপ কনফার্ম (Type Guard) করা হলো
  if (typeof data === "string") {
    // নিশ্চিত হওয়া গেল যে data একটি string, তাই string মেথড সেফলি ব্যবহার করা যাবে
    logMessage(`Processing string: ${data.toUpperCase()}`);
  } else if (typeof data === "number") {
    logMessage(`Processing number: ${data * 2}`);
  } else {
    logMessage("Received data of unsupported type");
  }
}

// never টাইপ: এই ফাংশনটি কখনই রিটার্ন করবে না (কারণ এটি এরর থ্রো করে প্রজেক্ট আটকে দেয়)
export function throwAppError(message: string): never {
  throw new Error(`[CRITICAL ERROR] ${message}`);
}

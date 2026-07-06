import { PrismaClient } from "../generated/client/client.js"; // জেনারেটেড ক্লায়েন্ট পাথ
import { PrismaPg } from "@prisma/adapter-pg"; // প্রিজমা পিজি অ্যাডাপ্টার

// ডাটাবেজ কানেকশন অ্যাডাপ্টার ইনিশিয়ালাইজ করলাম
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// গলোবাল প্রিজমা ক্লায়েন্ট টাইপ মার্জিং
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // অ্যাডাপ্টারটি পাস করা হলো
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

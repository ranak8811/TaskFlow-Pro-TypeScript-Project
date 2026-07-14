import "dotenv/config"; // ১. সবার প্রথমে ডট-এনভ কনফিগ লোড করলাম
import { PrismaClient } from "../generated/client/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// ২. ডাটাবেজ কানেকশন অ্যাডাপ্টার ইনিশিয়ালাইজ করলাম
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

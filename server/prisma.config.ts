import "dotenv/config";
import { defineConfig, env } from "prisma/config"; // env helper ইম্পোর্ট করলাম

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"), // process.env এর বদলে এটি নোড টাইপ এরর দূর করে
  },
});

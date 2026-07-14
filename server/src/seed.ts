import { prisma } from "./config/db.js";

async function main() {
  // ১. পুরাতন ডাটা চাইল্ড-টু-প্যারেন্ট ক্রমানুসারে ডিলিট করলাম
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();

  // ২. মক অ্যাডমিন ইউজার তৈরি করলাম
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      passwordHash: "mockpasswordhash123", // মক হ্যাশ
      name: "System Admin",
      role: "ADMIN",
    },
  });

  // ৩. ওয়ার্কস্পেস তৈরি করলাম
  const workspace = await prisma.workspace.create({
    data: {
      name: "Product Development",
      description: "Workspace for core app dev",
      ownerId: user.id,
      members: {
        connect: { id: user.id }, // ওনারকে মেম্বার হিসেবে অ্যাড করলাম
      },
    },
  });

  // ৪. প্রজেক্ট তৈরি করলাম
  const project = await prisma.project.create({
    data: {
      name: "Backend API Setup",
      description: "Express and TypeScript project design",
      workspaceId: workspace.id,
    },
  });

  // ৫. টেস্ট টাস্ক তৈরি করলাম
  await prisma.task.create({
    data: {
      title: "Establish Database Connection",
      description: "Verify PostgreSQL connection using seed script",
      status: "TODO",
      priority: "HIGH",
      projectId: project.id,
      assigneeId: user.id,
    },
  });

  console.log("[SUCCESS] Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // সফল বা ব্যর্থ রান শেষে কানেকশন ক্লোজ করলাম
  });

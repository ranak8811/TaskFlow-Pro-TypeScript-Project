import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db.js";
import { AppError } from "../utils/app-error.js";
import type {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  AddMemberInput,
} from "../schemas/workspace.schema.js";

// ১. নতুন ওয়ার্কস্পেস তৈরি করা
export async function createWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { name, description } = req.body as CreateWorkspaceInput;

    const workspace = await prisma.workspace.create({
      data: {
        name,
        description,
        ownerId: userId,
        members: {
          connect: { id: userId }, // ওনার নিজেও একজন মেম্বার
        },
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        members: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
}

// ২. অথেন্টিকেটেড ইউজারের সব ওয়ার্কস্পেস লিস্ট পাওয়া
export async function getMyWorkspaces(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [{ ownerId: userId }, { members: { some: { id: userId } } }],
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },
      orderBy: { id: "desc" },
    });

    res.status(200).json({
      success: true,
      data: workspaces,
    });
  } catch (error) {
    next(error);
  }
}

// ৩. নির্দিষ্ট একটি ওয়ার্কস্পেসের বিস্তারিত পাওয়া (আইডি দিয়ে)
export async function getWorkspaceById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    const { id } = req.params as { id: string };

    const workspace = await prisma.workspace.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        members: {
          select: { id: true, name: true, email: true, role: true },
        },
        projects: {
          select: { id: true, name: true, description: true },
        },
      },
    });

    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    // ইউজার কি ওনার বা মেম্বার কি না তা ভেরিফাই করা
    const isMember = workspace.members.some((m) => m.id === userId);
    if (workspace.ownerId !== userId && !isMember) {
      throw new AppError(
        "You do not have permission to view this workspace",
        403,
      );
    }

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
}

// ৪. ওয়ার্কস্পেস আপডেট করা (শুধুমাত্র ওনার করতে পারবে)
export async function updateWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    const { id } = req.params as { id: string };
    const { name, description } = req.body as UpdateWorkspaceInput;

    const workspace = await prisma.workspace.findUnique({ where: { id } });
    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    if (workspace.ownerId !== userId) {
      throw new AppError("Only the workspace owner can update it", 403);
    }

    const updated = await prisma.workspace.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
      },
    });

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

// ৫. ওয়ার্কস্পেস ডিলিট করা (শুধুমাত্র ওনার করতে পারবে)
export async function deleteWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    const { id } = req.params as { id: string };

    const workspace = await prisma.workspace.findUnique({ where: { id } });
    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    if (workspace.ownerId !== userId) {
      throw new AppError("Only the workspace owner can delete it", 403);
    }

    await prisma.workspace.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

// ৬. ওয়ার্কস্পেসে নতুন মেম্বার সংযুক্ত করা
export async function addMemberToWorkspace(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    const { id } = req.params as { id: string };
    const { email } = req.body as AddMemberInput;

    const workspace = await prisma.workspace.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!workspace) {
      throw new AppError("Workspace not found", 404);
    }

    if (workspace.ownerId !== userId) {
      throw new AppError("Only the workspace owner can add members", 403);
    }

    // ইউজার কি রেজিস্টার্ড কি না চেক করা
    const userToAdd = await prisma.user.findUnique({ where: { email } });
    if (!userToAdd) {
      throw new AppError("No user found with this email address", 404);
    }

    // অলরেডি মেম্বার কি না চেক করা
    const alreadyMember = workspace.members.some((m) => m.id === userToAdd.id);
    if (alreadyMember) {
      throw new AppError("User is already a member of this workspace", 400);
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: { id },
      data: {
        members: {
          connect: { id: userToAdd.id },
        },
      },
      include: {
        members: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: `${userToAdd.name} added to workspace successfully`,
      data: updatedWorkspace.members,
    });
  } catch (error) {
    next(error);
  }
}

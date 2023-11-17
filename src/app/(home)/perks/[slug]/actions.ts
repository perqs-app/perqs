"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function createTask(perkId: number) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.task.create({
      data: {
        perk: {
          connect: {
            id: perkId,
          },
        },
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create task");
  }
}

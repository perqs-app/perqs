"use server";

import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";

export async function resolveTask(
  taskId: number,
  userId: string,
  message: string,
  status: TaskStatus
) {
  // TODO send email to user
  // const user = await clerkClient.users.getUser(userId);

  await prisma.task.update({
    where: { id: taskId },
    data: {
      status,
      message,
    },
  });
}

"use server";

import z from "zod";
import { prisma } from "@/lib/utils";
import { Perk } from "@prisma/client";
import { schema } from "./_components/perk-form";

export async function createPerk(data: z.infer<typeof schema>) {
  return await prisma.perk.create({
    data,
  });
}

export async function updatePerk(perkId: number, data: z.infer<typeof schema>) {
  return await prisma.perk.update({
    where: {
      id: perkId,
    },
    data,
  });
}

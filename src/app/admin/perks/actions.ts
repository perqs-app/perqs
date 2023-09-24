"use server";

import { prisma } from "@/lib/prisma";
import { utapi } from "uploadthing/server";
import { schema } from "./_components/perk-form";
import z from "zod";

export async function createPerk(data: FormData) {
  const result: Record<string, unknown> = {};

  data.forEach((value, key) => {
    result[key] = value;
  });

  const [coverImageResponse, logoImageResponse] = await utapi.uploadFiles([
    result.coverImage,
    result.logoImage,
  ]);

  if (coverImageResponse.error || logoImageResponse.error) {
    throw new Error("Failed to upload images");
  }

  const coverImageUrl = coverImageResponse.data.url;
  const logoImageUrl = logoImageResponse.data.url;

  delete result.coverImage;
  delete result.logoImage;

  return await prisma.perk.create({
    data: {
      ...(result as z.infer<typeof schema>),
      price: Number(result.price),
      enabled: Boolean(result.enabled),
      coverImageUrl,
      logoImageUrl,
    },
  });
}

export async function updatePerk(id: number, data: FormData) {
  const result: Record<string, unknown> = {};

  data.forEach((value, key) => {
    if (value !== undefined) {
      result[key] = value;
    }
  });

  let coverImageUrl, logoImageUrl;

  if (result.coverImage || result.logoImage) {
    const [coverImageResponse, logoImageResponse] = await utapi.uploadFiles([
      result.coverImage,
      result.logoImage,
    ]);

    if (coverImageResponse.error || logoImageResponse.error) {
      throw new Error("Failed to upload images");
    }

    coverImageUrl = coverImageResponse.data.url;
    logoImageUrl = logoImageResponse.data.url;

    delete result.coverImage;
    delete result.logoImage;
  }

  return await prisma.perk.update({
    where: { id },
    data: {
      ...(result as Partial<z.infer<typeof schema>>),
      price: result.price !== undefined ? Number(result.price) : undefined,
      enabled:
        result.enabled !== undefined ? Boolean(result.enabled) : undefined,
      coverImageUrl,
      logoImageUrl,
    },
  });
}

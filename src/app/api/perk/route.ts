import { schema } from "@/app/admin/perks/_components/perk-form";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();

//     const result: Record<string, unknown> = {};

//     formData.forEach((value, key) => {
//       result[key] = value;
//     });

//     const newTask = schema.parse(result);

//     console.log(newTask.coverImage, newTask.logoImage);

//     // utapi.uploadFiles([newTask.coverImage, newTask.logoImage]);

//     // prisma.perk.create({

//     // })
//   } catch (error) {}
// }

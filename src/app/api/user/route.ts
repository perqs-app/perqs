import { clerkClient } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const user = await clerkClient.users.getUser(userId);

  return Response.json({ user });
}

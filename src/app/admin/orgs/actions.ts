"use server";

import { auth } from "@clerk/nextjs";
import { Organization, clerkClient } from "@clerk/nextjs/server";
import { schema } from "./_components/invite-user";
import z from "zod";

export async function inviteUser(
  organization: Organization,
  values: z.infer<typeof schema>
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await clerkClient.organizations.createOrganizationInvitation({
      ...values,
      organizationId: organization.id,
      inviterUserId: userId,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to invite user");
  }
}

export async function deleteOrganization(organization: Organization) {
  try {
    await clerkClient.organizations.deleteOrganization(organization.id);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to invite user");
  }
}

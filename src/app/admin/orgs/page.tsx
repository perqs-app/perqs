import { clerkClient } from "@clerk/nextjs";
import { CreateOrganization } from "./_components/create-organization";
import { OrganizationOverview } from "./_components/organization-overview";

export default async function OrgsPage() {
  // This request seems cached for now, so a hard reload seems necessary to see changes.
  const organizations = await clerkClient.organizations.getOrganizationList({
    limit: 20,
    includeMembersCount: true,
  });

  // We need to do this because Clerk's API returns a list of classes which are not serializable.
  const orgs = organizations.map((org) => {
    return Object.assign({}, org);
  });

  return (
    <div className="p-6 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Organizations</h1>
        <p>
          Here you can manage your organizations, create new ones, and invite
          users to them.
        </p>
      </div>
      <div className="flex justify-end">
        <CreateOrganization />
      </div>
      <div className="flex-1">
        <OrganizationOverview organizations={orgs} />
      </div>
    </div>
  );
}

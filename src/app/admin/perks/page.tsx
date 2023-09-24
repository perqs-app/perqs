import { prisma } from "@/lib/prisma";
import { CreatePerk } from "./_components/create-perk";
import { PerkOverview } from "./_components/perk-overview";

export default async function Perks() {
  const perks = await prisma.perk.findMany();

  return (
    <div className="p-6 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Perks</h1>
        <p>Here you can manage the perks that the end users will see.</p>
      </div>
      <div className="flex justify-end">
        <CreatePerk />
      </div>
      <div className="flex-1">
        <PerkOverview perks={perks} />
      </div>
    </div>
  );
}

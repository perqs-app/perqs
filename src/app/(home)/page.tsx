import { prisma } from "@/lib/prisma";
import { PerkOverview } from "./_components/perk-overview";
import { PerkFilter } from "./_components/perk-filter";

type HomeProps = {
  params: string;
  searchParams: {
    title: string;
    category: string;
  };
};

export default async function Home(props: HomeProps) {
  const { searchParams } = props;

  const { title, category } = searchParams;

  const perks = await prisma.perk.findMany({
    where: {
      enabled: true,
      ...(title && {
        title: {
          contains: title,
        },
      }),
      ...(category && { category: category }),
    },
  });

  return (
    <main className="flex flex-col p-8 gap-6">
      <PerkFilter {...searchParams} />
      <PerkOverview perks={perks} />
    </main>
  );
}

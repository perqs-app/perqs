import { prisma } from "@/lib/prisma";
import { PerkOverview } from "../_components/perk-overview";
import { PerkFilter } from "../_components/perk-filter";
import { Suspense } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type HomeProps = {
  searchParams: {
    title: string;
    category: string;
  };
};

export default async function PerksPage(props: HomeProps) {
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
    <div className="flex flex-col p-8 md:p-12 gap-8">
      <div className="flex gap-4 justify-between flex-col md:flex-row">
        <div>
          <h1 className="font-semibold text-2xl">Perks</h1>
          <p className="text-muted-foreground">
            Get started by requesting your first perk.
          </p>
        </div>
      </div>

      <div className="flex flex-col py-8 gap-6">
        <PerkFilter {...searchParams} />
        <Suspense
          fallback={
            <div className="w-full flex justify-center mt-16">
              <Loader2Icon className="h-6 w-6 animate-spin" />
            </div>
          }
        >
          <PerkOverview perks={perks} />
        </Suspense>
      </div>
    </div>
  );
}

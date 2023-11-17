import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PerkDetails } from "./_components/perk-details";

type PerkProps = {
  params: {
    slug: string;
  };
};

export default async function PerkPage(props: PerkProps) {
  const { params } = props;

  const perk = await prisma.perk.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!perk) {
    notFound();
  }

  return <PerkDetails perk={perk} />;
}

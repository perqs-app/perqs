"use client";

import { Button } from "@/components/ui/button";
import { Perk } from "@prisma/client";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NoSSR from "react-no-ssr";

type PerkOverviewProps = {
  perks: Perk[];
};

export function PerkOverview(props: PerkOverviewProps) {
  const { perks } = props;

  const router = useRouter();

  function handleClick() {
    const params = new URLSearchParams({
      category: "",
      title: "",
    });

    router.push(`?${params.toString()}`);
  }

  if (perks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="font-bold">No perks found</h1>
        <p className="text-muted-foreground capitalize text-sm mb-6">
          Try changing your filters
        </p>
        <Button variant="outline" size="sm" onClick={handleClick}>
          <XIcon className="mr-2 w-4 h-4" /> Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-start">
      {perks.map((perk) => (
        <div
          key={perk.id}
          className="flex-none flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-lg p-4"
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-2">
            <header className="flex items-start justify-start gap-2 w-full">
              {perk.logoImageUrl ? (
                <Image
                  src={perk.logoImageUrl}
                  width={50}
                  height={50}
                  className="object-cover h-[50px] w-[50px] rounded"
                  alt="perk-logo"
                />
              ) : (
                <div className="bg-muted w-[50px] h-[50px] rounded"></div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{perk.title}</h1>
                <p className="text-muted-foreground capitalize text-sm">
                  {perk.category.replace("-", " & ")}
                </p>
              </div>
            </header>
            <NoSSR>
              <p
                className="text-sm text-gray-500 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: perk.description }}
              ></p>
            </NoSSR>

            <Button className="self-end">Read more</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

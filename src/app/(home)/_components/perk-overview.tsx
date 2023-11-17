"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatter } from "@/lib/utils";
import { Perk } from "@prisma/client";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
          className="flex-none flex flex-col items-center justify-center h-42 max-h-42 bg-white rounded-lg border"
        >
          <div className="flex flex-col w-full h-full">
            <header className="flex items-center justify-between w-full p-6 bg-muted/50 border-b">
              <div className="flex gap-4 items-center">
                {perk.logoImageUrl ? (
                  <Image
                    src={perk.logoImageUrl}
                    width={50}
                    height={50}
                    className="object-cover h-[50px] w-[50px] rounded"
                    alt="perk-logo"
                  />
                ) : (
                  <div className="bg-muted w-[50px] h-[50px] rounded border"></div>
                )}
                <p className="text-md font-semibold">{perk.title}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => router.push("perks/" + perk.slug)}
                  >
                    View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <div className="p-6 py-2 text-sm text-muted-foreground">
              <div className="flex justify-between py-4 border-b">
                <p>Price</p>
                <p className="text-card-foreground">
                  {formatter.format(perk.price)}
                </p>
              </div>
              <div className="flex justify-between py-4">
                <p>Category</p>
                <Badge>{perk.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

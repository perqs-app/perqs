"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Perk } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { UpdatePerk } from "./update-perk";

type PerkOverviewProps = {
  perks: Perk[];
};

export function PerkOverview(props: PerkOverviewProps) {
  const { perks } = props;

  const columns: ColumnDef<Perk>[] = [
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>€{row.getValue("price")}</div>,
    },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "enabled", header: "Enabled" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div>
          {format(new Date(row.getValue("createdAt")), "E, d MMM yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => (
        <div>
          {format(new Date(row.getValue("createdAt")), "E, d MMM yyyy")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const perk = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <UpdatePerk perk={perk} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={perks} />;
}

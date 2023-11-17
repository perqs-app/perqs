"use client";

import { DataTable } from "@/components/ui/data-table";

import { ColumnDef } from "@tanstack/react-table";
import { Organization } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { InviteUser } from "./invite-user";
import { format } from "date-fns";

type OrganizationOverviewProps = {
  organizations: Organization[];
};

export function OrganizationOverview(props: OrganizationOverviewProps) {
  const { organizations } = props;

  const columns: ColumnDef<Organization>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "slug", header: "Slug" },
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
          {format(new Date(row.getValue("updatedAt")), "E, d MMM yyyy")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const organization = row.original;

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
              <InviteUser organization={organization} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={organizations} />;
}

"use client";

import { Perk, Task } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ResolveTask } from "./resolve-task";
import { formatter } from "@/lib/utils";
import { User } from "@clerk/nextjs/server";

type TaskOverviewProps = {
  tasks: (Task & { perk: Perk })[];
};

export function TaskOverview(props: TaskOverviewProps) {
  const { tasks } = props;

  const columns: ColumnDef<Task & { perk: Perk }>[] = [
    { accessorKey: "id", header: "ID" },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      accessorKey: "perk.title",
      header: "Title",
    },
    {
      header: "Price",
      cell: ({ row }) => <div>{formatter.format(row.original.perk.price)}</div>,
    },
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
        const task = row.original;

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
              <ResolveTask task={task} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={tasks} />;
}

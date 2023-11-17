"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Perk, Task } from "@prisma/client";
import { format } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TaskListProps = {
  tasks: (Task & { perk: Perk })[];
};

export function TaskList(props: TaskListProps) {
  const { tasks } = props;

  const router = useRouter();

  return (
    <div className="flex space-x-4 overflow-auto">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex-none flex flex-col items-center justify-center h-42 max-h-42 bg-white rounded-lg border w-80 max-w-full shrink-0"
        >
          <div className="flex flex-col w-full h-full">
            <header className="flex items-center justify-between w-full p-6 bg-muted/50 border-b">
              <div className="flex gap-4 items-center">
                {task.perk.logoImageUrl ? (
                  <Image
                    src={task.perk.logoImageUrl}
                    width={50}
                    height={50}
                    className="object-cover h-[50px] w-[50px] rounded"
                    alt="perk-logo"
                  />
                ) : (
                  <div className="bg-muted w-[50px] h-[50px] rounded border"></div>
                )}
                <p className="text-md font-semibold">{task.perk.title}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => router.push("perks/" + task.perk.slug)}
                  >
                    View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <div className="p-6 py-2 text-sm text-muted-foreground">
              <div className="flex justify-between py-4">
                <p>Requested on</p>
                <p className="text-card-foreground">
                  {format(task.createdAt, "E, d MMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

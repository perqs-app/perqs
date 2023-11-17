import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TaskList } from "./_components/task-list";
import { CopyPlusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const pendingTasks = await prisma.task.findMany({
    where: {
      userId,
      status: "PENDING",
    },
    include: {
      perk: true,
    },
  });

  const approvedTasks = await prisma.task.findMany({
    where: {
      userId,
      status: "COMPLETED",
    },
    include: {
      perk: true,
    },
  });

  const cancelledTasks = await prisma.task.findMany({
    where: {
      userId,
      status: "CANCELLED",
    },
    include: {
      perk: true,
    },
  });

  if (
    cancelledTasks.length === 0 &&
    approvedTasks.length === 0 &&
    pendingTasks.length === 0
  ) {
    return (
      <div className="flex flex-col p-8 md:p-12 gap-8">
        <div className="flex gap-4 justify-between flex-col md:flex-row md:items-center">
          <div>
            <h1 className="font-semibold text-2xl">Home</h1>
            <p className="text-muted-foreground">
              Welcome to Perqs! Stay updated on your latest perks here.
            </p>
          </div>
          <Button asChild>
            <Link href="/perks">
              <PlusIcon className="w-4 h-4 mr-2" />
              Explore Perks
            </Link>
          </Button>
        </div>
        <div className="flex flex-col py-8 gap-4 items-center">
          <CopyPlusIcon className="w-8 h-8 text-muted-foreground" />
          <div className="text-center">
            <p className="font-semibold">No Perks</p>
            <p className="text-muted-foreground">
              Get started by requesting your first perk.
            </p>
          </div>
          <Button asChild>
            <Link href="/perks">
              <PlusIcon className="w-4 h-4 mr-2" />
              Explore Perks
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 md:p-12 gap-8">
      <div className="flex gap-4 justify-between flex-col md:flex-row md:items-center">
        <div>
          <h1 className="font-semibold text-2xl">Home</h1>
          <p className="text-muted-foreground">
            Welcome to Perqs! Stay updated on your latest perks here.
          </p>
        </div>
        <Button asChild>
          <Link href="/perks">
            <PlusIcon className="w-4 h-4 mr-2" />
            Explore Perks
          </Link>
        </Button>
      </div>
      <div className="flex flex-col py-8 gap-8">
        {pendingTasks.length > 0 && (
          <div className="space-y-2">
            <div>
              <h2 className="font-semibold text-lg">Pending Perks</h2>
              <p className="text-muted-foreground text-sm">
                Perks that have recently been request but have yet to be
                resolved.
              </p>
            </div>
            <TaskList tasks={pendingTasks} />
          </div>
        )}
        {approvedTasks.length > 0 && (
          <div className="space-y-2">
            <div>
              <h2 className="font-semibold text-lg">Approved Perks</h2>
              <p className="text-muted-foreground text-sm">
                Perks that have recently been approved.
              </p>
            </div>
            <TaskList tasks={approvedTasks} />
          </div>
        )}
        {cancelledTasks.length > 0 && (
          <div className="space-y-2">
            <div>
              <h2 className="font-semibold text-lg">Cancelled Perks</h2>
              <p className="text-muted-foreground text-sm">
                Perks that have recently been cancelled.
              </p>
            </div>
            <TaskList tasks={cancelledTasks} />
          </div>
        )}
      </div>
    </div>
  );
}

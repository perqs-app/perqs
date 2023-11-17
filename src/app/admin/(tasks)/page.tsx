import { prisma } from "@/lib/prisma";
import { TaskOverview } from "./_components/task-overview";

export default async function Tasks() {
  const tasks = await prisma.task.findMany({
    include: {
      perk: true,
    },
    orderBy: [
      {
        status: "asc", // 'PENDING' would come before other statuses alphabetically
      },
    ],
  });

  return (
    <div className="p-6 flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p>Here you can manage all open tasks.</p>
      </div>
      <div className="flex-1">
        <TaskOverview tasks={tasks} />
      </div>
    </div>
  );
}

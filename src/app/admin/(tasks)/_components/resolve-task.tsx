"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import React from "react";
import { Perk, Task } from "@prisma/client";
import { resolveTask } from "../actions";
import { TextEditor } from "@/components/ui/text-editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatter } from "@/lib/utils";
import { UserDetails } from "./user-details";
import { User } from "@clerk/nextjs/server";

const schema = z.object({
  message: z.string().min(1, { message: "This field is required" }),
  status: z.union([z.literal("COMPLETED"), z.literal("CANCELLED")]),
});

type ResolveTaskProps = {
  task: Task & { perk: Perk };
};

export function ResolveTask(props: ResolveTaskProps) {
  const { task } = props;

  const [open, setOpen] = React.useState<boolean>();
  const [loading, setLoading] = React.useState<boolean>();

  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
      status: "COMPLETED",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);

    await resolveTask(task.id, task.userId, values.message, values.status);

    router.refresh();

    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          disabled={task.status !== "PENDING"}
        >
          <CheckIcon className="w-4 h-4 mr-2" /> Resolve Task
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve this task</DialogTitle>
          <DialogDescription>
            Take all the necessary steps to resolve this task, fill in all
            required information in the message. This will be send over email to
            the user.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-4 text-sm">
            <UserDetails userId={task.userId} />
            <div>
              <h3 className="font-bold">Perk details</h3>
              <p>{task.perk.title}</p>
              <p>{task.perk.category}</p>
              <p>{formatter.format(task.perk.price)}</p>
            </div>
          </div>
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <TextEditor
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      Message to the user containing all necessary information.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the new status this perk" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the new status this task (
                      <span className="font-bold">this can not be undone</span>
                      ).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  Confirm
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { Input } from "@/components/ui/input";
import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  slug: z.string().optional(),
});

export function CreateOrganization() {
  const [loading, setLoading] = React.useState<boolean>();
  const [open, setOpen] = React.useState<boolean>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { createOrganization } = useOrganizationList();

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      if (!createOrganization) {
        return;
      }

      setLoading(true);

      await createOrganization(values);

      setLoading(false);
      setOpen(false);
      form.reset();

      toast({
        title: "Organization created",
        description: "Your organization has been created",
      });
    } catch (_) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Fill in the following fields to create your organization, you can
            invite your first user afterwards.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Perqs" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="perqs" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is for optionally setting a custom slug for your
                    organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                <Loader2Icon
                  className={cn("mr-2 h-4 w-4 animate-spin", {
                    hidden: !loading,
                  })}
                />
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, Loader2, Loader2Icon, MailPlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Organization } from "@clerk/nextjs/server";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inviteUser } from "../actions";
import React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export const schema = z.object({
  emailAddress: z.string().email({ message: "Please enter a valid email" }),
  role: z.enum(["admin", "basic_member"]),
});

type InviteUserProps = {
  organization: Organization;
};

export function InviteUser(props: InviteUserProps) {
  const { organization } = props;

  const [loading, setLoading] = React.useState<boolean>();
  const [open, setOpen] = React.useState<boolean>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailAddress: "",
      role: "admin",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true);

      await inviteUser(organization, values);

      setLoading(false);
      setOpen(false);
      form.reset();

      toast({
        title: "User invited",
        description: "The user has been invited to the organization",
      });
    } catch (error: any) {
      setLoading(false);

      if (error.message) {
        toast({
          title: "Error",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <MailPlusIcon className="w-4 h-4 mr-2" /> Invite User
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user to this Organization</DialogTitle>
          <DialogDescription>
            This user will receive an email with an invitation to join this
            organization.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The invitation will be send to this email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="basic_member">Basic Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select which role the user should have.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              <Loader2Icon
                className={cn("mr-2 h-4 w-4 animate-spin", {
                  hidden: !loading,
                })}
              />
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Organization } from "@clerk/nextjs/server";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { deleteOrganization } from "../actions";

type DeleteOrganizationProps = {
  organization: Organization;
};

export function DeleteOrganization(props: DeleteOrganizationProps) {
  const { organization } = props;

  const [loading, setLoading] = React.useState<boolean>();
  const [open, setOpen] = React.useState<boolean>();

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true);

      await deleteOrganization(organization, values);

      setLoading(false);
      setOpen(false);
      form.reset();

      toast({
        title: "User invited",
        description: "The user has been invited to the organization",
      });
    } catch (error: any) {
      setLoading(false);

      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2Icon className="w-4 h-4 mr-2" /> Delete Organization
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            organization <strong>({organization.name})</strong> and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

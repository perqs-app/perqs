import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { updatePerk } from "../actions";
import { PerkForm, schema } from "./perk-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Perk } from "@prisma/client";

type UpdatePerkProps = {
  perk: Perk;
};

export function UpdatePerk(props: UpdatePerkProps) {
  const { perk } = props;

  const [open, setOpen] = React.useState<boolean>();

  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof schema>) {
    try {
      await updatePerk(perk.id, values);

      toast({
        title: "Perk updated",
        description: "The perk was successfully updated",
      });

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to update perk",
        description: "Something went wrong while updating the perk",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditIcon className="w-4 h-4 mr-2" /> Edit Perk
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Perk</DialogTitle>
          <DialogDescription>
            Fill in the following fields to create a new perk
          </DialogDescription>
        </DialogHeader>
        <PerkForm onSubmit={handleSubmit} perk={perk} />
      </DialogContent>
    </Dialog>
  );
}

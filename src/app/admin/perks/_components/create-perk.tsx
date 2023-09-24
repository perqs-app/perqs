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

import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import React from "react";
import z from "zod";
import { createPerk } from "../actions";
import { useRouter } from "next/navigation";
import { PerkForm, schema } from "./perk-form";

export function CreatePerk() {
  const [open, setOpen] = React.useState<boolean>();

  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof schema>) {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (value instanceof File || typeof value === "string") {
          formData.append(key, value);
        } else if (typeof value === "number" || typeof value === "boolean") {
          formData.append(key, value.toString());
        }
      }

      await createPerk(formData);

      toast({
        title: "Perk created",
        description: "The perk was successfully created",
      });

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to create perk",
        description: "Something went wrong while creating the perk",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Perk
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Perk</DialogTitle>
          <DialogDescription>
            Fill in the following fields to create a new perk
          </DialogDescription>
        </DialogHeader>
        <PerkForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

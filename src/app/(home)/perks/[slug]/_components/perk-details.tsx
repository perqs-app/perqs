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
import { Button } from "@/components/ui/button";
import { Perk } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import NoSSR from "react-no-ssr";
import { createTask } from "../actions";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type PerkDetailsProps = {
  perk: Perk;
};

export function PerkDetails(props: PerkDetailsProps) {
  const { perk } = props;

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { toast } = useToast();

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await createTask(perk.id);

      setOpen(false);
      setLoading(false);

      toast({
        title: "Perk requested",
        description:
          "Perk has been requested, it can take up to 2 business days before it is delivered",
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
    <div className="flex flex-col">
      {perk.coverImageUrl ? (
        <Image
          src={perk.coverImageUrl}
          alt="cover image"
          width={500}
          height={500}
          className="w-full h-64 object-cover"
          priority
        />
      ) : (
        <div className="w-full h-64 bg-muted"></div>
      )}
      <div className="flex gap-6 p-8 xl:items-start xl:flex-row flex-col items-stretch">
        <div className="p-6 flex flex-col gap-6 border rounded-md flex-1">
          <header className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              {perk.logoImageUrl ? (
                <Image
                  src={perk.logoImageUrl}
                  width={50}
                  height={50}
                  className="object-cover h-[50px] w-[50px] rounded"
                  alt="perk-logo"
                />
              ) : (
                <div className="bg-muted w-[50px] h-[50px] rounded"></div>
              )}
              <h1 className="text-2xl font-bold">{perk.title}</h1>
            </div>
            <Badge variant="default" className="capitalize">
              {perk.category.replace("-", " & ")}
            </Badge>
          </header>
          <NoSSR>
            <p
              dangerouslySetInnerHTML={{ __html: perk.description }}
              className="mb-8"
            />
          </NoSSR>
          d
        </div>
        <div className="p-6 border rounded-md w-96 flex flex-col justify-between bg-muted">
          <div className="border-b pb-6">
            <p>Amount </p>
            <p className="font-semibold">{formatter.format(perk.price)}</p>
          </div>
          <p className="py-6">
            It can take up to 2 business days before the perk is delivered.
          </p>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="mt-6">
                <PlusIcon className="mr-2 w-4 h-4" /> Claim this perk
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Would you like to claim this perk?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will deduct{" "}
                  <span className="font-semibold">
                    {formatter.format(perk.price)}
                  </span>{" "}
                  euros from your account and can not be undone. It can take up
                  2 business days before the perk is delivered.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick} disabled={loading}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

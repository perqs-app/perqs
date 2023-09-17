"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextEditor } from "@/components/ui/text-editor";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EuroIcon, Loader2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Perk } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

export const schema = z.object({
  title: z.string().min(1, { message: "This field is required" }),
  description: z.string().min(1, { message: "This field is required" }),
  slug: z.string().min(1, { message: "This field is required" }),
  category: z.union([
    z.literal("sports"),
    z.literal("entertainment"),
    z.string(),
  ]),
  coverImageUrl: z.string().url(),
  logoImageUrl: z.string().url(),
  price: z.coerce.number(),
  enabled: z.boolean(),
});

type PerkFormProps = {
  perk?: Perk;
  onSubmit: (values: z.infer<typeof schema>) => Promise<void>;
};

export function PerkForm(props: PerkFormProps) {
  const { perk, onSubmit: handleSubmit } = props;

  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: perk?.title ?? "",
      description: perk?.description ?? "",
      category: perk?.category ?? "sports",
      coverImageUrl: perk?.coverImageUrl ?? "",
      logoImageUrl: perk?.logoImageUrl ?? "",
      price: perk?.price ?? 0,
      enabled: perk?.enabled ?? true,
      slug: perk?.slug ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);

    await handleSubmit(values);

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Basic-fit" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of your perk.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="basic-fit" {...field} />
                </FormControl>
                <FormDescription>
                  A unique identifier for this perk.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <EuroIcon className="h-4 w-4 mr-2" />
                    <Input type="number" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  The price of the perk in euros.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category for this perk" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Used to categorize the perk.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="coverImageUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Cover image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://example.com/image.jpg"
                  />
                </FormControl>
                <FormDescription>
                  The url of an image that will be used as the cover letter.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logoImageUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Logo image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://example.com/image.jpg"
                  />
                </FormControl>
                <FormDescription>
                  The url of an image that will be used as the logo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <TextEditor
                  onChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormDescription>Describe the perk in detail.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable this perk</FormLabel>
                <FormDescription>
                  When enabled, this perk will be available to users.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
  );
}

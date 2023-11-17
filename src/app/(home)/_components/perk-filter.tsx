"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { debounce } from "lodash";
import React from "react";

const schema = z.object({
  title: z.string(),
  category: z.union([
    z.literal("health-fitness"),
    z.literal("shopping"),
    z.literal("food"),
    z.literal("lifestyle"),
    z.literal("personal-development"),
    z.literal("leisure"),
    z.string(),
  ]),
});

type PerkFilterProps = {
  title?: string;
  category?: string;
};

export function PerkFilter(props: PerkFilterProps) {
  const { title, category } = props;

  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      category: category ?? "",
      title: title ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const params = new URLSearchParams(values);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="max-w-3xl">
      <Form {...form}>
        <form
          className="flex flex-col sm:flex-row gap-2 sm:items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title of perk.." {...field} />
                </FormControl>
                <FormDescription>
                  Search by the title of a perk.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    form.handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    <SelectItem value="health-fitness">
                      Health & Fitness
                    </SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="personal-development">
                      Personal Development
                    </SelectItem>
                    <SelectItem value="leisure">Leisure</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Filter by a specific category of perk.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <SearchIcon className="w-5 h-5 mr-2" />
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowLeftIcon,
  Building2Icon,
  ClipboardCheckIcon,
  LayoutListIcon,
  MenuIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export const NAVIGATION_ITEMS = [
  {
    title: "Tasks",
    href: "/admin",
    icon: ClipboardCheckIcon,
  },
  {
    title: "Perks",
    href: "/admin/perks",
    icon: LayoutListIcon,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: UsersIcon,
  },
  {
    title: "Organizations",
    href: "/admin/orgs",
    icon: Building2Icon,
  },

  {
    title: "Back to Home",
    href: "/",
    icon: ArrowLeftIcon,
  },
];

export function Header() {
  return (
    <header className="flex justify-between lg:justify-end p-4 bg-background">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="lg:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Perqs</SheetTitle>
          </SheetHeader>
          <NavigationMenu data-orientation="vertical">
            <NavigationMenuList className="flex-col items-start space-x-0 space-y-1 max-w-full">
              {NAVIGATION_ITEMS.map(({ href, icon, title }) => (
                <NavigationMenuItem key={href}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {React.createElement(icon, { className: "w-4 h-4 mr-2" })}
                      {title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}

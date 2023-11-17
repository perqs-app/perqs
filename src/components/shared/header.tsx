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
import { UserButton, useClerk } from "@clerk/nextjs";
import { LucideIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
};

export function Header(props: HeaderProps) {
  return (
    <header className="flex lg:hidden justify-between py-5 px-8 md:px-12 bg-background">
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
              {props.items.map(({ href, icon, title }) => (
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

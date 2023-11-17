"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { UserButton, useClerk } from "@clerk/nextjs";

type SidebarProps = {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
};

export function Sidebar(props: SidebarProps) {
  const { user } = useClerk();

  return (
    <aside className="hidden lg:flex flex-col justify-between w-80 p-4 text-indigo-950 border-r h-screen">
      <div>
        <Image
          src="/perqs.svg"
          alt="Logo"
          width={80}
          height={80}
          className="m-4"
        />
        <NavigationMenu data-orientation="vertical">
          <NavigationMenuList className="flex-col items-start space-x-0 space-y-1">
            {props.items.map(({ href, icon, title }) => (
              <NavigationMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={twMerge(navigationMenuTriggerStyle(), "text-md")}
                  >
                    {React.createElement(icon, {
                      className: "w-5 h-5 mr-4",
                    })}
                    {title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-2 m-4">
        <UserButton afterSignOutUrl="/" />
        <p>{user?.fullName}</p>
      </div>
    </aside>
  );
}

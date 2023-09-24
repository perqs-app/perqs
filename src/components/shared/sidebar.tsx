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

type SidebarProps = {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
};

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="hidden lg:block w-60 p-2 bg-background/50">
      <NavigationMenu data-orientation="vertical">
        <NavigationMenuList className="flex-col items-start space-x-0 space-y-1">
          {props.items.map(({ href, icon, title }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {React.createElement(icon, { className: "w-4 h-4 mr-2" })}
                  {title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}

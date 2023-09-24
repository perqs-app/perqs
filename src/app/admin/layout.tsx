"use client";

import { Header } from "@/components/shared/header";
import { Sidebar } from "@/components/shared/sidebar";
import {
  ClipboardCheckIcon,
  LayoutListIcon,
  UsersIcon,
  Building2Icon,
  ArrowLeftIcon,
} from "lucide-react";

const NAVIGATION_ITEMS = [
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header items={NAVIGATION_ITEMS} />
      <div className="flex flex-1">
        <Sidebar items={NAVIGATION_ITEMS} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

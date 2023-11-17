"use client";

import { Header } from "@/components/shared/header";
import { Sidebar } from "@/components/shared/sidebar";
import { BlocksIcon, HomeIcon, PlusIcon, UserCogIcon } from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Perks",
    href: "/perks",
    icon: BlocksIcon,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: UserCogIcon,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen max-w-screen">
      <Sidebar items={NAVIGATION_ITEMS} />
      <main className="flex-1 max-w-full max-h-full overflow-auto">
        <Header items={NAVIGATION_ITEMS} />
        {children}
      </main>
    </div>
  );
}

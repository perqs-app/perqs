"use client";

import { Header } from "@/components/shared/header";
import { Sidebar } from "@/components/shared/sidebar";
import { UserCogIcon } from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    title: "Admin",
    href: "/admin",
    icon: UserCogIcon,
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

"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Flame,
  Lightbulb,
  Type,
  Image,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Trend Explorer",
    href: "/dashboard/trend-explorer",
    icon: Flame,
  },

  {
    label: "Idea Generator",
    href: "/dashboard/idea-generator",
    icon: Lightbulb,
  },

  {
    label: "Title Generator",
    href: "/dashboard/title-generator",
    icon: Type,
  },

  {
    label: "Thumbnail Generator",
    href: "/dashboard/thumbnail-generator",
    icon: Image,
  },

  {
    label: "Script Generator",
    href: "/dashboard/script-generator",
    icon: FileText,
  },

  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },

  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside
      className="
        hidden lg:flex
        fixed left-0 top-0
        h-screen w-72
        glass
        border-r border-white/10
        flex-col
        z-50
      "
    >
      <div className="p-8">
        <h1
          className="
            text-3xl font-bold
            gradient-text
          "
        >
          Viralyst
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                text-zinc-300
                hover:bg-white/5
                hover:text-white
                transition
              "
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
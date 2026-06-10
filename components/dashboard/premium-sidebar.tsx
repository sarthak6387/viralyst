"use client";

import Link from "next/link";


import {
  useState,
} from "react";

import {

  LayoutDashboard,
  TrendingUp,
  Lightbulb,
  Type,
  Image,
  Users,
  FileText,
  Settings,
  Bookmark,
  Bot,
  CalendarDays,
  Menu,
  X

} from "lucide-react";

const links = [
  {
  label: "Content Calendar",
  href: "/dashboard/content-calendar",
  icon: CalendarDays,
},

  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Trend Explorer",
    href: "/dashboard/trend-explorer",
    icon: TrendingUp,
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
    label: "Competitor Analyzer",
    href: "/dashboard/competitor-analyzer",
    icon: Users,
  },

  {
    label: "Script Generator",
    href: "/dashboard/script-generator",
    icon: FileText,
  },

  {
    label: "Saved Ideas",
    href: "/dashboard/saved-ideas",
    icon: Bookmark,
  },

  {
    label: "AI Copilot",
    href: "/dashboard/ai-copilot",
    icon: Bot,
  },

  {
    label: "Settings",
    href: "/dashboard/profile",
    icon: Settings,
  },
];

export default function
PremiumSidebar() {

  const [open, setOpen] =
    useState(false);

  return (

    <>

      {/* MOBILE MENU BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          fixed
          top-5 left-5
          z-50
          rounded-xl
          border border-white/10
          bg-black/40
          p-3
          text-white
          backdrop-blur-xl
          md:hidden
        "
      >

        {
          open
          ? <X size={22} />
          : <Menu size={22} />
        }

      </button>

      {/* SIDEBAR */}

      <aside
        className={`
          fixed md:relative
          z-40
          flex
          flex-col
          w-72
          min-h-screen
          border-r border-white/10
          bg-black/30
          backdrop-blur-2xl
          p-6
          transition-transform
          duration-300

          ${
            open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* LOGO */}

        <div className="mb-10">

          <h1
            className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            Viralyst
          </h1>

          <p className="mt-2 text-zinc-500">
            Creator Intelligence
          </p>

        </div>

        {/* NAV LINKS */}

        <div className="space-y-2">

          {
            links.map((link) => {

              const Icon =
                link.icon;

              return (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex items-center
                    gap-3
                    rounded-2xl
                    px-4 py-3
                    text-zinc-300
                    hover:bg-white/5
                    hover:text-white
                    transition-all
                  "
                >

                  <Icon size={20} />

                  <span>
                    {link.label}
                  </span>

                </Link>
              );
            })
          }

        </div>

        {/* FOOTER */}

        <div className="mt-auto pt-10">

          <div
            className="
              glass
              rounded-2xl
              p-5
            "
          >

            <p className="text-sm text-zinc-400">
              Powered by
            </p>

            <h3
              className="
                mt-2
                text-lg
                font-bold
                gradient-text
              "
            >
              Viralyst AI
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500
              "
            >
              Real-time creator
              intelligence platform.
            </p>

          </div>

        </div>

      </aside>

    </>
  );
}
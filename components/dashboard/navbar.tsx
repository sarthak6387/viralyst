"use client";

import { logout }
  from "@/firebase/auth";

import { useRouter }
  from "next/navigation";

export function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await logout();

    router.push("/login");
  }

  return (
    <header
      className="
        glass
        sticky top-0 z-40
        h-20
        border-b border-white/10
        flex items-center justify-between
        px-8
      "
    >
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="
          rounded-xl
          bg-red-500/20
          px-4 py-2
          text-red-400
        "
      >
        Logout
      </button>
    </header>
  );
}
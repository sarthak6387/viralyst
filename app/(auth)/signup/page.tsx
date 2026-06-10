"use client";

import { useState } from "react";

import { signupWithEmail } from "@/firebase/auth";

import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSignup() {
    try {
      await signupWithEmail(
        email,
        password
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        bg-[#070B14]
        px-4
      "
    >
      <div
        className="
          glass
          w-full max-w-md
          rounded-3xl
          p-8
        "
      >
        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

        <div className="space-y-4 mt-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full rounded-xl
              bg-white/5
              border border-white/10
              px-4 py-3
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full rounded-xl
              bg-white/5
              border border-white/10
              px-4 py-3
            "
          />

          <button
            onClick={handleSignup}
            className="
              w-full
              rounded-xl
              bg-purple-600
              py-3
            "
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}
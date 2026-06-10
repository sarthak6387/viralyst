"use client";

import { useState } from "react";

import {
  signInWithGoogle,
  loginWithEmail,
} from "@/firebase/auth";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      await loginWithEmail(
        email,
        password
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle();

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
          Welcome Back
        </h1>

        <p className="text-zinc-400 mt-2">
          Login to Viralyst
        </p>

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
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-purple-600
              py-3 font-medium
            "
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          <button
            onClick={handleGoogleLogin}
            className="
              w-full
              rounded-xl
              bg-white/10
              py-3 font-medium
            "
          >
            Continue with Google
          </button>
        </div>
      </div>
    </main>
  );
}
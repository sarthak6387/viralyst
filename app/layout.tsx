import "./globals.css";

import type {
  Metadata,
} from "next";

import {
  Toaster,
} from "sonner";

import {
  AuthProvider,
} from "@/hooks/useAuth";

export const metadata:
Metadata = {

  title: "Viralyst",

  description:
    "AI Creator Intelligence Platform",
};

export default function
RootLayout({

  children,

}: {

  children:
    React.ReactNode;

}) {

  return (

    <html lang="en">

      <body>

        <AuthProvider>

          {/* GLOBAL TOASTS */}

          <Toaster
            richColors
            position="top-right"
          />

          {children}

        </AuthProvider>

      </body>

    </html>
  );
}
import type { Config } from "tailwindcss";

const config: Config = {
 darkMode: ["class", '[data-theme="dark"]'],

  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#070B14",
        surface: "#111827",

        primary: "#7C3AED",
        secondary: "#06B6D4",
        accent: "#F43F5E",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.35)",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
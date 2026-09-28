import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F4ED",
        foreground: "#1F281E",
        muted: {
          DEFAULT: "#ECEAE1",
          foreground: "#555A51",
          dark: "#3B4238",
        },
        accent: {
          DEFAULT: "#3E4A3B",
          hover: "#2F382D",
          light: "#E7EAE3",
          foreground: "#F5F4ED",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.65)",
          foreground: "#1F281E",
          border: "rgba(31, 40, 30, 0.10)",
        },
        border: "rgba(31, 40, 30, 0.12)",
      },
      fontFamily: {
        serif: ["'Bodoni Moda'", "var(--font-bodoni)", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(31, 40, 30, 0.04)",
        glass: "0 8px 32px rgba(31, 40, 30, 0.06)",
        card: "0 12px 40px -10px rgba(31, 40, 30, 0.08)",
        "card-hover": "0 20px 50px -12px rgba(31, 40, 30, 0.14)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;

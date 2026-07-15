import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1B2A4A",
          light: "#2C4270",
          dark: "#101A30",
        },
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#C77F1F",
          light: "#F5C98A",
        },
        sage: {
          DEFAULT: "#3F6659",
          light: "#5C8A7A",
        },
        paper: {
          DEFAULT: "#F6F4EF",
          dark: "#EDE9DF",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 2px 10px rgba(27, 42, 74, 0.08)",
        "card-hover": "0 8px 24px rgba(27, 42, 74, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0C0C0C",
        muted: "#A3A3A3",
        secondary: "#6B6B6B",
        subtle: "#C9C9C9",
        surface: "#F5F5F5",
        "surface-light": "#FAFAFA",
        dark: "#0C0C0C",
        accent: "#C8102E",
        "accent-hover": "#E11236",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-fraunces)", "Fraunces", "serif"],
      },
      keyframes: {
        checkCircle: {
          to: { strokeDashoffset: "0" },
        },
        checkMark: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        checkCircle: "checkCircle 0.6s ease-out 0.3s forwards",
        checkMark: "checkMark 0.4s ease-out 0.7s forwards",
      },
    },
  },
  plugins: [],
};
export default config;

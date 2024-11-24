import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-clr": "var(--primary-clr)",
        "btn-hover-clr": "var(--btn-hover-clr)",
        "btn-hover-txt": "var(--btn-hover-txt)",
        "secondary-clr": "var(--secondary-clr)",
        "bg-clr": "var(--bg-clr)"
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        secondary: "#C6A43F",
        accent: "#FF6B6B",
        background: "#F5F7FA",
      },
    },
  },
  plugins: [],
};

export default config;

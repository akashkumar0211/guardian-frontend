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
        'custom-error': '#d44849',
        "dark-blue": "#04121E",
        "critical": "#f44336", // Red
        "high": "#ff9800", // Orange
        "medium": "#ffc107", // Yellow
        "low": "#2196f3",
      }
    },
  },
  plugins: []
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1'},
          '100%': { opacity: '0'},
        }
      },
      animation: {
        fadeOut: 'fadeOut 2s ease-out'
      }
    },
  },
  plugins: [],
};
export default config;


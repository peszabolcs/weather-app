/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-red-500", "text-white", "p-4", "text-lg"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

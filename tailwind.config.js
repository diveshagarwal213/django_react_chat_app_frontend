/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        text_primary: "var(--text-primary)",
        text_secondary: "var(--text-secondary)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          brand: {
            dark: "#0d1b2a",
            light: "#1b263b",
            accent: "#e0aaff",
          },
        },
      },
    },
    plugins: [],
  }
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./Pages/**/*.{js,jsx}",
    "./Components/**/*.{js,jsx}",
    "./App/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "*.{js,jsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        orange: {
          500: '#C86500',
          400: '#e17a0a',
        },
        blue: {
          primary: '#0B1DBF',
        },
        gray: {
          input: '#F5F5F5',
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}


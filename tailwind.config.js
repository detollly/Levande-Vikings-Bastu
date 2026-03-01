/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1700px",
      },
    },
  },
  plugins: [],
}


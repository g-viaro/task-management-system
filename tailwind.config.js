/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#111111',
        'light': '#ffffff',
        'accent': '#52308c',
        'background': '#ebebeb',
        'danger': '#dd1606'
      }
    },
  },
  plugins: [],
}


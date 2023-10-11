/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'blueBg': '#0A327B',
        'snow': '#F7FAFD',
        'veryLight': '#DDE7EE',
        'lightGray': '#E5EFFA',
      },
      textColor: {
        'darkGray': '#5E6778',
        'blue': '#0A327B',
        'veryDarkGray': '#1C202B',
        'grayBlue': '#939CAD',
      },
    },
  },
  plugins: [],
}
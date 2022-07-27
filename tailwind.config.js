/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // "./src/**/*.{html,js}",
    "./partials/**/*.ejs",
    "./views/**/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: 'rgba(0, 174, 239, 100.00)',
        brandBlueDark: 'rgba(0, 99, 130, 100.00)',
        brandBlueBack: 'rgba(0, 49, 80, 100.00)',
        backGrad1: 'rgba(208, 208, 228, 100.00)',
        backGrad2: 'rgba(228, 228, 248, 100.00)'
      }
    },
  },
  plugins: [],
}

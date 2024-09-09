/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkest-grey': '#1D1D1D',
        'dark-grey': '#2D2D2D',
        'dark-grey-icon': '#4A4A4A',
        'light-grey': '#626262',
        'lightest-grey': '#B9B9B9',
        'light-grey-span': '#ACACAC',
        'grey-icon': '#A4A4A4',
        'border-grey': '#3D3D3D',
        'light-bg-grey': '#373737',
      },
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'monomaniac-one': ['Monomaniac One', 'sans-serif'],
    },
    plugins: [],
  }
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'text-lightBlue',
    'text-darkBlue',
    'text-orange',
    'text-gray-400',
  ],
  theme: {
    extend: {
      colors: {
        pink: '#972E84',
        lightBlue: '#3586BF',
        darkBlue: '#3C4489',
        orange: '#FF9A46'
      }
    },
  },
  plugins: [],
}

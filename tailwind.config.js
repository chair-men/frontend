/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      backdrop: '#FBEAD9', //antique white
      button: {
        enabled: '#FDCDC5', //light red
        disabled: '#888888' //gray
      }
    },
    extend: {},
  },
  plugins: [],
}

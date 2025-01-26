/** @type {import('tailwindcss').Config} */

const fontFamily = require("tailwindcss/defaultTheme").fontFamily


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Belanosima: ["Belanosima", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}


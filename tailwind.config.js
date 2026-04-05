/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        simBlue: "#00C6FF",
        simDark: "#0A0F2C",
        simCyan: "#1DE9B6"
      }
    },
  },
  plugins: [],
}

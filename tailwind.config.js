/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        simtrace: {
          primary: "#0D47A1",     // Deep Blue - main brand color
          secondary: "#1976D2",   // Lighter Blue - accents
          accent: "#9C27B0",      // Purple accent
          info: "#0288D1",        // Cards/info
          success: "#2E7D32",     // Success green
          warning: "#FBC02D",     // Yellow warning
          light: "#F5F5F5",       // Light background
          dark: "#212121",        // Dark text
        },
      },
    },
  },
  plugins: [],
};

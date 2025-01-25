/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#4f46e5",
        PrimaryDark: "#1e1b4b",
      },
      backgroundColor: {
        Primary: "#4f46e5",
        PrimaryDark: "#1e1b4b",
      },
      fontFamily: {
        Poppins: ["Poppins", "serif"],
        Koulen: ["Koulen", "sans-serif"],
      },
    },
  },
  plugins: [],
};

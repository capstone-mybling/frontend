/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pantone: "#6667AB",
        "pantone-light": "#A3A5D9",
        "pantone-lighter": "#C2C2E0",
        "pantone-lightest": "#E6E6F2",
        "pantone-dark": "#3D3F6F",
        "pantone-darker": "#2A2B4A",
        "pantone-darkest": "#1A1A2E",
        "purchase-button": "#009ff6",
      },
      aspectRatio: {
        "9/16": "9/16",
        "2/3": "2/3",
        "3/4": "3/4",
      },
      fontFamily: {
        nanumGothic: ["var(--nanum)"],
      },
    },
  },
  darkMode: "media", // class
  plugins: [require("@tailwindcss/forms")],
};

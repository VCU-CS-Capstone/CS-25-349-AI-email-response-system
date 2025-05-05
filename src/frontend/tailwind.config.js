/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-600": "#082348",
        "navy-500": "#1d3259",
        "navy-400": "#455680",
        "navy-300": "#6d7daa",
        "navy-200": "#97a6d6",
        "navy-100": "#e6f0ff",
        "navy-fade": "#7d8ea8",
      },
    },
  },
  plugins: [],
};

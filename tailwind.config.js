/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-7": "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        "300": "300px",
        "1100": "1100px"
      }
    },
    screens: {
      'xs': '480px',
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};

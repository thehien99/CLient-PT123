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
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1024px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '768px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '640px' },
      // => @media (max-width: 639px) { ... }
      'xs': { 'max': '426px' }
      // => mobile
    }
  },
  plugins: [],
};

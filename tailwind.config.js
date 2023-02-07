/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  variants: {
    width: ['responsive', 'hover', 'focus'],
    scrollbar: ['rounded'],
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
  theme: {
    screens: {
      sm: '390px',
      // => @media (min-width: 640px) { ... }

      md: '1024px',
      // => @media (min-width: 768px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  }
};

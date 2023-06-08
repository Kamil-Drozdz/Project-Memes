/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  variants: {
    width: ['responsive', 'hover', 'focus'],
    scrollbar: ['rounded'],
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
  theme: {
    minWidth: {
      400: '400px'
    }
  }
};

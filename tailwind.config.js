/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#c9f4cf',
          DEFAULT: '#2f855a',
          dark: '#22543d',
        },
      },
    },
  },
  plugins: [],
};

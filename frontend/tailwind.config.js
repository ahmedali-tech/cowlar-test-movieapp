/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#00cc00',
        secondaryGreen: '#66ff33',
        backgroundBlack: 'rgba(0,0,0,.93)'
       
      },
    },
  },
  plugins: [],
  darkMode: 'false', // Disable dark mode
};

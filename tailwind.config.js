/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include the main HTML file
    './src/**/*.{js,ts,jsx,tsx}', // Include all JS/TS/React files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff', // Primary button/link color
        secondary: '#535bf2', // Hover state color
        dark: '#242424', // Dark background color
        light: '#f9f9f9', // Light background color
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue, you can adjust this
        secondary: 'orange', // Green, you can adjust this
        // Add team colors here for the 6 divisions
        admin: '#62b6cb',    // Amber
        event: '#3a6ea5',    // Red
        design: '#5fa8d3',   // Purple
        life: '#ff8811',     // Pink
        study: '#f9c74f',    // Blue
        facilities: '#f07167' // Green
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        heading: ['"Noto Serif TC"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
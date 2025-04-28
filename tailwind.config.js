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
        admin: '#F59E0B',    // Amber
        event: '#EF4444',    // Red
        design: '#8B5CF6',   // Purple
        life: '#EC4899',     // Pink
        study: '#3B82F6',    // Blue
        facilities: '#10B981' // Green
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
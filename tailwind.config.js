// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* === 品牌基調 === */
        primary:   '#1F2937',
        onPrimary: '#FFFFFF',
        accent:    '#006A4E',
        softblue:  '#C8D2DD',
        leaf:      '#D4E157',

        /* === 六大組別 === */
        admin:      '#334155', // Slate 800
        event:      '#0B5E3D', // Pine 700
        design:     '#4F637E', // Blue-Gray 600
        life:       '#7A8F2B', // Olive 600
        study:      '#2553D8', // Blue 600
        facilities: '#505C70', // Slate 600
      },

      fontFamily: {
        sans: [
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
        serif: [
          '"Noto Serif TC"', 'ui-serif', 'Georgia', 'Cambria',
          'Times New Roman', 'Times', 'serif',
        ],
        heading: [
          '"Noto Serif TC"', 'ui-sans-serif', 'system-ui',
          'Segoe UI', 'Roboto', 'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

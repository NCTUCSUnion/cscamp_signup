// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryLight: '#A4E65E', // Apple Green 300
        primary:      '#9ABF80', // Apple Green 500
        onPrimary:    '#000000',

        /* === 輔助 === */
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

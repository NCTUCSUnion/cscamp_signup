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
        admin:      '#475569', // Slate 600 - 沉穩深灰藍
        event:      '#C2410C', // Orange 700 - 熱情橘
        design:     '#9333EA', // Purple 600 - 創意紫
        life:       '#0D9488', // Teal 600 - 清新青綠
        study:      '#1D4ED8', // Blue 700 - 知性藍
        facilities: '#A16207', // Yellow 700 - 工業土黃
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

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ui: {
          1: '#18181a',
          2: '#232326',
          3: '#39393e',
          4: '#7c7c87',
          5: '#ffffff',
        },
        danger: '#cc3b40',
        warning: '#f8a34e',
        success: '#4baf40',
        light: '#fcd34d',
        resource: '#10b981',
        asset: '#a156d6',
        code: '#ea7c45',
        transform: '#5796e8',
      },
    },
  },
  plugins: [],
};

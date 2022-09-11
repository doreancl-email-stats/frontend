const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
  },
  plugins: [],
}

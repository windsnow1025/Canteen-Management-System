module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '100': '25rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

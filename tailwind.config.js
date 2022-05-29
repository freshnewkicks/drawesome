module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slideUp': 'slideUp .09s linear forwards',
        'toolboxSlideOut': 'toolboxSlideOut .15s linear forwards',
        'toolboxSlideIn': 'toolboxSlideIn .15s linear forwards'
      }
    },
  },
  plugins: [],
}

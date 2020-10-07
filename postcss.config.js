module.exports = {
  plugins: {
    autoprefixer: {},
    '@fullhuman/postcss-purgecss': {
      content: [
        './src/**/*.html',
        './src/**/*.vue'
      ]
    }
  }
}

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: '@import "@/style/_build.scss";'
      }
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/documentaries'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}

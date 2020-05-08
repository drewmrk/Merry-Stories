module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/styles/abstracts/_variables.scss";
                @import "@/styles/abstracts/_mixins.scss";
              `
      }
    }
  }
}

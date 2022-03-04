module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    extract: false,
  },
  // https://github.com/wuruoyun/vue-component-lib-starter#third-party-libraries
  configureWebpack: {
    externals: {
      vuetify: 'vuetify'
    }
  }
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         shared: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: 'vendor',
  //           enforce: true,
  //           chunks: 'all',
  //         }
  //       }
  //     }
  //   }
  // }
};

const path = require('path');

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
  },
  chainWebpack: config => {
    config.module
      .rule('supportChaining')
      .test(/\.js$/)
        .include
          .add(path.resolve('node_modules/pdfjs-dist'))
          .end()
      .use('babel-loader')
        .loader('babel-loader')
        .tap(options => ({ ...options, 
          plugins : ['@babel/plugin-proposal-optional-chaining']
        }))
        .end()
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

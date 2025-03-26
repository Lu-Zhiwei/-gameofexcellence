const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  
  // PWA 配置
  pwa: {
    name: 'GameOfExcellence',
    themeColor: '#4f46e5',
    msTileColor: '#4f46e5',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true
    }
  },
  
  // 自定义构建配置
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'GameOfExcellence - 专业在线图像处理工具'
      return args
    })
    
    // 图像优化
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        webp: {
          quality: 75
        }
      })
      
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    })
  }
})
const path = require('path')
module.exports = {
  // 基本路径
  publicPath: './',

  // 输出文件目录
  // 默认dist
  outputDir: undefined,

  // 用于嵌套生成的静态资产（js,css,img,fonts）目录
  // assetsDir: '',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // Default: 'index.html'
  indexPath: 'index.html',

  // 静态资源名添加 hash
  filenameHashing: true,

  // 构建多页时使用
  // vue-cli 创建的项目都默认配置了将 @ 指向 /src
  pages: {
    index: './src/main.js'
  },

  // eslint-loader是否在保存的时候检查
  // 生产构建时禁用 eslint-loader
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的Vue核心的构建，应用额外增加 10kb 左右
  runtimeCompiler: undefined,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
      }
    }
  },
  // config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 在 ./node-moudles/@vue/cli-service/lib/config/css.js 文件中配置了 px2rem-loader 用于 px => rem 转换
    // 针对 .vue 文件中使用 css moudle
    config.module.rule('scss').oneOf('vue-modules').use('css-loader').loader('css-loader').options({
      modules: true,
      localIdentName: '[name]_[local]_[hash:base64:5]'
    })
    // 添加图片压缩 loader
    config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({
      bypassOnDebug: true, // webpack@1.x
      disable: true, // webpack@2.x and newer
    })
  },

  // css相关配置
  css: {
    modules: true,
    sourceMap: true,
    loaderOptions: {}
  },

  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    hotOnly: false,
    proxy: null, // 设置代理
    // before: app => {},
  },

  // PWA 插件相关配置
  pwa: {},

  // 第三方插件配置
  pluginOptions: {
    // ...
  },

  assetsDir: undefined,
  parallel: undefined
}

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static', // 静态文件目录
    assetsPublicPath: '/', // 相对文件路径
    proxyTable: {},
    host: 'localhost',
    port: '8000',
    autoOpenBrowser: false, // 是否自动打开浏览器
    errorOverlay: true, // 浏览器错误提示遮罩层
    notifyOnErrors: true, // 编译错误的时候通知提示，需要friendly-errors-webpack-plugin 配合
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true, // 便宜使用eslint-loader模块
    showEslintErrorsInOverlay: false, // eslint浏览器错误提示遮罩层
    devtool: 'cheap-module-eval-source-map', // Source Maps
    cssSourceMap: true, // css Source Maps
    cacheBusting: false, // vue debugg 提示
  }
}

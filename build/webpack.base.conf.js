const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 定义resolve函数
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 开发模式
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  // 文件入口
  entry: {
    app: './src/main.js'
  },
  // 文件出口
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  // 处理路径或者后缀名
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // 模块，loader
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: resolve('src')
      }
    ]
  },
  // 插件
  plugins: [
    new VueLoaderPlugin(),
    // html模板打包
    new HtmlWebpackPlugin({
      filename: resolve('dist/index.html'),
      template: resolve('index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    })
  ]
}
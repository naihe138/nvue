const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios'],
    // ui: ['element-ui', 'echarts']
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false,
        cache: true
      })
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}
const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios'],
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        sourceMap: false,
        cache: '../build-catch/',
        terserOptions: {
          compress: {
            inline: 1, // https://github.com/mishoo/UglifyJS2/issues/2842
            warnings: false,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
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
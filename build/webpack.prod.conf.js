'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // npm i --save-dev html-webpack-plugin@next
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 一个优化'压缩CSS的WebPack插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const utils = require('./utils')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  module: {
    rules: [
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { 
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          } 
        ]
      }
    ]
  },
  // 此选项控制是否以及如何生成source-map。cheap-module-eval-source-map is faster for development
  devtool: config.build.devtool,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false,
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { safe: true, map: config.build.productionSourceMap }
      })
    ]
  },
  plugins: [
    // css 提取
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
      chunkFilename: 'static/css/[name].[hash].css',
      sourceMap: false
    }),
    // DLL
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vue-manifest.json')
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: require('../dll/ui-manifest.json')
    // }),
    // html模板打包
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: resolve('index.html'),
      inject: true, // 允许注入打包文件
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 折叠空白区域
        removeAttributeQuotes: true // 尽可能删除属性周围的引号
      },
      chunksSortMode: 'dependency' // 允许控制chunk的排序在插入到HTML之前
    }),
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 插入到html
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/*.dll.js'),
      publicPath: config.build.assetsPublicPath + 'static/js',
      outputPath: '../dist/static/js'
    }),
    // 复制静态文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // 打包进度
    new webpack.ProgressPlugin(true)
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
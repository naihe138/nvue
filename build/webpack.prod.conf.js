'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const HappyPack = require('happypack')
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
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].js')
  },
  // 此选项控制是否以及如何生成source-map。cheap-module-eval-source-map is faster for development
  devtool: config.build.devtool,
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
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { safe: true, map: config.build.productionSourceMap }
      })
    ],
    namedModules: true,
    namedChunks: true,
    providedExports: true,
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: ['happypack/loader?id=eslint'],
        enforce: 'pre',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      // {
      //   test: /\.vue$/,
      //   loader: ['happypack/loader?id=vue'],
      //   exclude: /node_modules/,
      //   include: resolve('src'),
        
      // },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: [
          // 'thread-loader',
          {
            loader: 'vue-loader',
            options: {
              cacheDirectory: resolve('./build-catch'),
              cacheIdentifier: 'cache-loader:{version} {process.env.NODE_ENV}'
            }
          }
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/,
      //   include: resolve('src')
      // }
    ]
  },
  plugins: [
    // css 提取
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
      chunkFilename: 'static/css/[name].css',
      sourceMap: false
    }),
    // DLL
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vue-manifest.json')
    }),
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
    // new webpack.HashedModuleIdsPlugin(),
    // 开启 Scope Hoisting
    // Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"
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
    new webpack.ProgressPlugin({}),
    // eslint多线程
    new HappyPack({
      id: 'eslint',
      use: [
        {
          loader: 'eslint-loader',
          options: {
            cache: true,
            formatter: require('eslint-friendly-formatter'),
            emitWarning: !config.dev.showEslintErrorsInOverlay
          }
        }
      ]
    }),
    // babel多线程
    new HappyPack({
      id: 'babel',
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }),
    // vue多线程
    // new HappyPack({
    //   id: 'vue',
    //   loaders: [{
    //     loader: 'vue-loader',
    //     option: {
    //       cacheDirectory: resolve('./build-catch'),
    //       cacheIdentifier: 'cache-loader:{version} {process.env.NODE_ENV}'
    //     }
    //   }]
    // })
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

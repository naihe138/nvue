const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config')
const utils = require('./utils')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  // path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
  // path.join('/foo', 'bar', 'baz/asdf')
  // 返回: '/foo/bar/baz/asdf'
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: resolve('src'),
        options: {
          cacheDirectory: resolve('./cache-loader'),
          cacheIdentifier: 'cache-loader:{version} {process.env.NODE_ENV}'
        }
      },
      {
        test: /\.js$/,
        use: isProduction ? [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('cache-loader'),
            }
          },
          'babel-loader'
        ] : 'babel-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
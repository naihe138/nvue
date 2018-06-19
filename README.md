# nvue
一个用`webpack4`打包的`vue` 的项目，参照`vue-cli`的`webpack`配置，一步一步带你实现一个vue的打包的项目，每一个commit对应一个步骤。


### clone project

`git clone git@github.com:naihe138/nvue.git`

### install

`npm install` or `yarn`


### 一、初始化项目，对应第一次commit


初始化项目，用`vue-loader`来打包`.vue`文件，`html-webpack-plugin`插件来导出`html`文件。
第一步我们很简单，就利用`vue-loader` 和` babel-loader `是把`.vue`文件打包出来，总共才40多行代码，看`build/webpack.base.conf.js`文件注释就看的懂。`+++`表示有省略的代码

````javascript
module.exports = {
  +++
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
  }
  +++
}

````

运行 `webpack --config build/webpack.base.conf.js`


### 二、打包css和图片等资源，对应第二次commit

这里打包`css`以`sass `为例，用到了`mini-css-extract-plugin`插件提取`css`，用`url-loader`来处理字体、图片、音频等资源。非常简单。如下代码，`+++`表示有省略的代码

````javascript
+++
module.exports = {
  +++
  // 模块，loader
  module: {
    rules: [
      +++
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      }
      +++
    ]
  },
  // 插件
  plugins: [
    +++
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css'
    })
  ]
}

````

运行 `webpack --config build/webpack.base.conf.js`

### 三、配置热加载、代理等开发环境，对应第三次commit

通过`build/config.js`来设置开发配置。如下注释

````javascript

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
    poll: false,
    useEslint: true, // 便宜使用eslint-loader模块
    showEslintErrorsInOverlay: false, // eslint浏览器错误提示遮罩层
    devtool: 'cheap-module-eval-source-map', // Source Maps
    cssSourceMap: true, // css Source Maps
    cacheBusting: false, // vue debugg 提示
  }
}

````

在`webpack.dev.conf.js`中，通过`webpack-dev-server `插件来开启热重载服务，同时配置自动补全css兼容代码的插件，`postcss-loader`

运行`npm run dev` 或者 `yarn dev ` 就可以启动服务了

### 四、配置打包环境，对应第四次commit

通过`build/config.js`来设置开发配置。如下注释

````
const path = require('path')

module.exports = {
  +++
  build: {
    // html模板
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 生产环境的souce map
    productionSourceMap: false,
    devtool: '#source-map',
    // 开启静态文件的Gzip压缩
    // 如果是true 的话  需要 npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 打包完成显示包大小的状态分析
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

````
运行`npm run build` 或者 `yarn build ` 就可以实现打包vue项目啦。

### 五、检查版本，优化打包输出和Eslint设置，对应第五次commit

在`check-version.js`中用 `shelljs `模块检查时候有npm命令，` semver`模块语义化版本号，然后在`build.js`合并`webpack.prod.conf.js`的的配置，然后组在格式化输出。

````javascript

// 检查时候有安装npm命令
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

// 格式化输出
process.stdout.write(stats.toString({
  colors: true,
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false
}) + '\n\n')

````

通过eslint-loader 来配置eslint的检查，建立.eslintrc.js去设置规则

````javascript
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

````

### 六、打包优化，对应第六次commit

1、添加`DllPlugin`和`DllReferencePlugin`来打包优化不变的库，
2、通过`cache-loader`来做`loader`的缓存，
3、通过`UglifyJsPlugin`的`parallel`来开启多线程打包

先运行`npm run dll` 然后 `npm run build`
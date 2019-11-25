'use strict'
const fs = require('fs')
// const path = require('path')
const utils = require('./utils')

class RouteChunkCachePlugin {
  constructor () {}

  apply (compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('after-optimize-chunks', (chunks) => {
        chunks.forEach((chunk) => {
          if (!chunk.isInitial()) {
            return
          }
          chunk.forEachModule((module) => {
            module.usedExports = true
          })
        })
      })
    })
    compiler.plugin('after-compile', function (compilation, callback) {
      Object.keys(compilation.assets).some(file => {
        // 确保路由chunk的输出目录包含 'js/public-route.js'
        if (file.includes('js/public-route.js')) {
          let source = compilation.assets[file]
          let content = source.source()
          let cachePath = process.cwd() + '/.route-chunk-cache.js'
          try {
            let cache = fs.readFileSync(cachePath, 'utf-8') || ''
            let code = utils.mergeJSONP(cache, content)
            source._cachedSource = code
            source._value = code
            fs.writeFile(cachePath, code, 'utf8', function (err) {console.log(err)})
          } catch (e) {
            console.log('cache: create route chunk')
            fs.writeFile(cachePath, content, 'utf8', function (err) {if (!err) {console.log('cache: create successful')}})
            return true
          }
        }
      })
      callback()
    })
  }
}

module.exports = RouteChunkCachePlugin

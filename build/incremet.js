const path = require('paht')
const fs = require('fs')


class FileListPlugin {
  constructor (options = {}) {
    this.options = options
  }
  apply (compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) =>{
      let filelist='## 文件列表'
      filelist = Object.keys(compilation.assets).reduce((filelist, filename) => filelist+'\r\n- '+ filename, filelist)
      console.log(this.options.name)
      compilation.assets[this.options.name ? this.options.name : 'filelist.md'] = {
        source() {
          return filelist
        },
        size() {
          return filelist.length
        }
      }
  });
  }
}

module.exports = FileListPlugin

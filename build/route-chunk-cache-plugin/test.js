// let utils = require("./utils.js")
let path = require('path')

let code = `var t = {"6XqC" :function (e, t, a) {
    var n = { "./ams/router/index.js": "WYUE", "./uamp/router/index.js": "546p" }
  }}`
let code2 = `var t = {"6XqC" :function (e, t, a) {
    var n = { "./ams/router/index.js": "WYUE", "./uamp/router/index.js": "t546p" }
  }}`

// console.log(utils.mergeJSONP(code,code2))

console.log(path.resolve('.cache-loader'))
console.log(process.cwd() + '/.route-chunk-cache.js')

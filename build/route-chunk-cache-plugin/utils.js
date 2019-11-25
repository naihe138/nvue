let babylon = require('babylon')
let traverse = require('babel-traverse').default
let generator = require('babel-generator').default
let t = require('babel-types')

let oldProps = ''
let oldRouterPath = ''
let handle = false

// 旧的覆盖新的
function mergeProps (oldProps, newProps) {
  let arr = oldProps.filter(item => {
    return newProps.findIndex(t => {
      let a = t.key.value || t.key.name
      let b = item.key.value || item.key.name
      return a === b
    }) < 0
  })
  return [...arr, ...newProps]
}

function mergeJSONP (oldCode, newCode) {
  let ast = babylon.parse(oldCode)
  let ast2 = babylon.parse(newCode)
  traverse(ast, {
    ArrayExpression (path) {
      if (path.node && Array.isArray(path.node.elements) && path.node.elements[0] && path.node.elements[0].value === 'public-route') { //确保路由chunk 取名为 public-route 也可取名为更独特不易重复的
        let call = path.parentPath.node
        oldProps = call.arguments[1].properties
      }
    },
    ObjectExpression (path) {
      if (path.node.properties && path.node.properties[0] && path.node.properties[0].key.value && path.node.properties[0].key.value.includes('router/index.js')) {  // 确保产品线路由主文件路径包含 router/index.js
        oldRouterPath = path.node.properties
      }
    }
  })

  traverse(ast2, {
    ArrayExpression (path) {
      if (path.node && Array.isArray(path.node.elements) && path.node.elements[0] && path.node.elements[0].value === 'public-route' && handle === false) { // 同上
        let call = path.parentPath.node
        let newProps = call.arguments[1].properties
        let props = mergeProps(oldProps, newProps)
        path.parentPath.replaceWith(
          t.CallExpression(call.callee, [call.arguments[0], t.objectExpression(props)])
        )
        handle = true
      }
    },
    ObjectExpression (path) {
      if (!path.node.isReplace && path.node.properties && path.node.properties[0] && path.node.properties[0].key.value && path.node.properties[0].key.value.includes('router/index.js')) { //同上
        let node = t.ObjectExpression([...oldRouterPath, ...path.node.properties])
        node.isReplace = true
        path.replaceWith(
          node
        )
      }
    }
  })

  let code = generator(ast2).code
  return code
}

module.exports.mergeJSONP = mergeJSONP

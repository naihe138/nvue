const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const fs = require('fs')
const path = require('path')

var data = fs.readFileSync(path.resolve(__dirname, './json.js'))

// const code = data.toString()

const code = `(window.webpackJsonp = window.webpackJsonp || []).push([
  ["chunk-router"],
  {
    a: function (a, b) {
      return [1];
    },
    b: 2
  }
])`

const code2 = `(window.webpackJsonp = window.webpackJsonp || []).push([
  ["chunk-router"],
  {
    a: function (a, b) {
      return [1, 2, 3, 4];
    },
    b: 2
  }
])`


const ast = parser.parse(code)

// // console.log(ast)
let index = 1
traverse(ast, {
  enter(path) {
    if (path.node.type === 'ArrayExpression' && path.node.elements.length > 1 && path.node.elements[1].type === 'ObjectExpression') {
      console.log(path.node.elements[1])
    }
  }
})

// const output = generate(ast, {}, code)

// console.log(output)
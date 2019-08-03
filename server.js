'use strict'
const express = require('express')
const chalk = require('chalk')
const app = express()

app.use(express.static('dist'))

app.listen(4005, () => {
  console.log('server start at: ' + chalk.blue(`http://localhost:4005`))
})

#!/usr/bin/env node

var fs = require('fs')
var constants = require('./constants')

var obj = fs.readdirSync(constants.SRC_DIR)
  .filter((fName) => fName.match(constants.JS_SUFFIX))
  .map((fName) => fName.replace(constants.JS_SUFFIX, ''))
  .reduce((memo, val) => {
    memo[val] = `require('./${val}')`
    return memo
  }, {})

console.log('module.exports = ' + JSON.stringify(obj, null, 2).replace(/"/g, '') + '\n')

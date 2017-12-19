#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var pkg = require(path.resolve(__dirname, '..', 'package.json'))
pkg.main = './src/index.js'
fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, 2))

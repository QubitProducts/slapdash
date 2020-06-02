#!/usr/bin/env node
/**
 * Slapdash buildchain
 * ===
 *
 * > "Why use someone else's wheel when you can re-invent your own?"
 * > -- Jim O'Brien, author of Slapdash
 *
 * 1. Get list of methods
 * 2. Use hacky regex to get module contents + dependencies
 * 3. Inline *everything*
 * 4. ???
 * 5. Profit!
 */

var fs = require('fs')
var path = require('path')
var constants = require('./constants')

var pkg = require(constants.PKG_PATH)
pkg.main = './dist/index.js'
fs.writeFile(constants.PKG_PATH, JSON.stringify(pkg, null, 2), function () {})

function getMethods () {
  var obj = {}
  fs.readdirSync(path.join(constants.SRC_DIR, 'util'))
    .map((x) => `util/${x}`)
    .concat(fs.readdirSync(constants.SRC_DIR))
    .filter((fName) => fName.match(constants.JS_SUFFIX) && !fName.includes('index.js'))
    .map((fName) => fName.replace(constants.JS_SUFFIX, ''))
    .map((name) => ({
      name: name.replace(/^[^\/]+\//, ''),
      path: name + '.js',
      isCore: name.indexOf('/') === -1,
      src: getModuleSourceByName(name + '.js').split(/\r?\n/g)
    }))
    .map(parseModule)
    .forEach((method) => { obj[method.name] = method })

  return obj
}

function getModuleSourceByName (name) {
  return fs.readFileSync(path.join(constants.SRC_DIR, name), 'utf8')
}

function parseModule (module) {
  var name = module.name
  var out = {
    def: [],
    dep: [],
    exp: [],
    ext: []
  }

  var nonEmptyLines = module.src.filter((line) => line && !line.match(constants.INLINE_COMMENT))
  var last
  for (var i = 0; i < nonEmptyLines.length; i++) {
    var line = nonEmptyLines[i]
    var dep = line.match(constants.REQUIRE_STMT)
    var def = line.match(constants.TOP_LEVEL_VAR)
    var exp = line.match(constants.MODULE_EXPORT_STMT)
    var ext = line.match(constants.MODULE_EXPORT_EXTEND)

    if (dep) {
      last = 'dep'
      out.dep.push(line)
    } else if (def || (last === 'def' && !exp)) {
      last = 'def'
      out.def.push(line)
    } else if (exp || (last === 'exp' && !ext)) {
      last = 'exp'
      out.exp.push(line)
    } else if (ext || (last === 'ext')) {
      last = 'ext'
      out.ext.push(line)
    }
  }

  return {
    name: name,
    path: module.path,
    isCore: module.isCore,
    definitions: out.def,
    exports: out.exp,
    dependencies: out.dep,
    extensions: out.ext
  }
}

function deExport (exports) {
  if (!exports.length) {
    return []
  }
  return [ exports[0].replace(constants.MODULE_EXPORT_STMT, '') ]
    .concat(exports.slice(1))
}

function deExportExtensions (method, methods) {
  var extensions = method.extensions
  if (!extensions.length) {
    return []
  }
  var names = methods.filter((method) => method.isCore).map((method) => method.name)
  return [ extensions[0].replace(constants.MODULE_EXPORT_EXTEND, `_.${method.name}.`) ]
    .concat(extensions.slice(1).map((line) => {
      var out = line
      names
        .filter((name) => name !== method.name)
        .forEach((name) => {
          out = out.replace(new RegExp('\\b' + name + '\\b'), (x) => `_.${x}`)
        })
      return out
    }))
}

function remap (method, methods, exports) {
  var names = methods.filter((method) => method.isCore).map((method) => method.name)
  var definition = exports.map((line) => {
    var out = line
    names
      .filter((name) => name !== method.name)
      .forEach((name) => {
        out = out.replace(new RegExp('\\b' + name + '\\b'), (x) => `_.${x}`)
      })
    return out
  })
  return [`  ${method.name}: ${definition[0]}`]
    .concat(definition.slice(1).map((line) => `  ${line}`)).join('\n')
}

function generateBundle () {
  var methods = getMethods()
  var methodList = Object.keys(methods).map((key) => methods[key])
  var definitions = methodList
    .map((module) => module.definitions)
    .reduce((memo, item) => memo.concat(item), [])
  var helpers = methodList
    .filter((method) => !method.isCore)
    .map((method) => deExport(method.exports))
    .reduce((memo, item) => memo.concat(item), [])
  var moduleDefs = methodList
    .filter((method) => method.isCore)
    .map((method) => remap(method, methodList, deExport(method.exports)))
    .concat([ `  name: '${pkg.name}'`, `  version: '${pkg.version}'` ])
    .join(',\n')
  var slapdash = ['var _ = {'].concat(moduleDefs, ['}'])
  var extensions = methodList
    .map((module) => deExportExtensions(module, methodList))
    .reduce((memo, item) => memo.concat(item), [])
  var exports = 'module.exports = _'
  return definitions.concat(helpers, slapdash, extensions, exports).join('\n')
}

if (module.parent) {
  module.exports = generateBundle()
} else {
  console.log(generateBundle())
}

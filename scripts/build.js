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

var JS_SUFFIX = /\.js$/g
var REQUIRE_STMT = /^var\s+([^=\s]+)\s*=\s*require\(\'([^\']+)\'\);?/
var COMMENT_STMT = /^\/\//
var MODULE_EXPORT_STMT = /^module\.exports\s*=\s*/g
var MODULE_EXPORT_EXTEND = /^module\.exports\./
var SRC_DIR = path.resolve(__dirname, '..', 'src')

function getMethods () {
  var obj = {}
  fs.readdirSync(path.join(SRC_DIR, 'util'))
    .map((x) => `util/${x}`)
    .concat(fs.readdirSync(SRC_DIR))
    .filter((fName) => fName.match(JS_SUFFIX))
    .map((fName) => fName.replace(JS_SUFFIX, ''))
    .map((name) => ({
      name: name.replace(/^[^\/]+\//, ''),
      path: name + '.js',
      isCore: name.indexOf('/') === -1,
      src: getModuleSourceByName(name + '.js')
    }))
    .map(parseModule)
    .forEach((method) => { obj[method.name] = method })

  return obj
}

function getModuleSourceByName (name) {
  return fs.readFileSync(path.join(SRC_DIR, name), 'utf8')
    .split(/\r?\n/g)
}

function parseModule (module) {
  var src = module.src
  var name = module.name
  return {
    name: name,
    path: module.path,
    isCore: module.isCore,
    src: src
      .filter((line) => line && !line.match(REQUIRE_STMT) && !line.match(COMMENT_STMT))
      .map((line) => line
        .replace(MODULE_EXPORT_STMT, `var ${name} = `)
        .replace(MODULE_EXPORT_EXTEND, `${name}.`)
      )
      .join('\n'),
    deps: src
      .map((line) => line.match(REQUIRE_STMT))
      .filter((x) => x)
      .map((dep) => ({ name: dep[1], path: dep[2] }))
  }
}

function generateIndex (methods) {
  return Object.keys(methods)
    .map((name) => methods[name])
    .filter((mod) => mod.isCore)
    .map((mod, i, arr) => `  "${mod.name}": ${mod.name}${i < arr.length - 1 ? ',' : ''}`)
    .join('\n')
}

var methods = getMethods()

var output = Object.keys(methods)
  .map((name) => methods[name].src)
  .concat([ 'module.exports = {', generateIndex(methods), '}' ])
  .join('\n')

console.log(output)

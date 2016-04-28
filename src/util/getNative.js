var isNative = require('./isNative')
var nativeMethodsCache = {}
var global = Function('return this')() // eslint-disable-line no-new-func

module.exports = function getNative (name, fallback) {
  if (!nativeMethodsCache[name]) {
    var nameParts = name.split(/\./g)
    var namePartsLength = nameParts.length
    var method = global
    for (var i = 0; i < namePartsLength; i++) {
      method = method && method[nameParts[i]]
    }

    nativeMethodsCache[name] = (method && isNative(method)) ? method : fallback
  }

  return nativeMethodsCache[name]
}

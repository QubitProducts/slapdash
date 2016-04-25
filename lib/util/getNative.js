var isNative = require('./isNative')
var cache = {}
var global = Function('return this')() // eslint-disable-line no-new-func

module.exports = function getNative (name, fallback) {
  if (!cache[name]) {
    var method = name
      .split(/\./g)
      .reduce(function (memo, key) { return memo[key] || false }, global)

    cache[name] = (method && isNative(method)) ? method : fallback
  }
  return cache[name]
}

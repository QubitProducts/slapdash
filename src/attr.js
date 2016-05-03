var reduce = require('./reduce')

module.exports = function attr (object, path, val) {
  var set = typeof val !== 'undefined'
  var parts = path.split('.')
  return reduce(parts, function (memo, next, i) {
    var isObject = typeof memo === 'object' && memo != null
    if (set && i === parts.length - 1) return isObject && (memo[next] = val)
    return isObject ? memo[next] : undefined
  }, object)
}

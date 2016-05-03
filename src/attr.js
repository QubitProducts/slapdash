var reduce = require('./reduce')

module.exports = function attr (object, path, val) {
  var set = typeof val !== 'undefined'
  var parts = path.split('.')
  return reduce(parts, function (memo, next, i) {
    if (typeof memo !== 'object' || memo == null) return
    return (set && i === parts.length - 1) ? (memo[next] = val) : memo[next]
  }, object)
}

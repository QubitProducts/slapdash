var reduce = require('./reduce')

module.exports = function set (object, path, val) {
  return reduce(path.split('.'), function (memo, next, i, parts) {
    if (typeof memo !== 'object' || memo == null) return
    return (i === parts.length - 1) ? (memo[next] = val) : memo[next]
  }, object)
}

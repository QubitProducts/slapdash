var reduce = require('./reduce')

module.exports = function set (object, path, val) {
  return reduce(path.split('.'), function (memo, next, i, parts) {
    if (!memo || typeof memo !== 'object') return
    return (i === parts.length - 1) ? (memo[next] = val) : memo[next]
  }, object)
}

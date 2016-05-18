var reduce = require('./reduce')

module.exports = function get (object, path) {
  return reduce(path.split('.'), function (memo, next) {
    return (typeof memo !== 'undefined' && memo !== null) ? memo[next] : undefined
  }, object)
}

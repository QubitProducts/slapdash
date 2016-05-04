var reduce = require('./reduce')

module.exports = function get (object, path) {
  return reduce(path.split('.'), function (memo, next) {
    return (memo && typeof memo === 'object') ? memo[next] : undefined
  }, object)
}

var reduce = require('./reduce')
var indexOf = require('./indexOf')
module.exports = function unique (array) {
  return reduce(array, function (memo, curr) {
    if (indexOf(memo, curr) === -1) {
      memo.push(curr)
    }
    return memo
  }, [])
}

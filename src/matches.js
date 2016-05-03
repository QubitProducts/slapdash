var isMatch = require('./isMatch')
module.exports = function matches (spec) {
  return function (obj) {
    return isMatch(obj, spec)
  }
}

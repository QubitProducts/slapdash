var matches = require('./matches')
module.exports = function isMatch (obj, match) {
  return matches(match)(obj)
}

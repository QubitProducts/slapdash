var map = require('./map')

module.exports = function pluck (array, key) {
  return map(array, function pluckValue (value) { return value[key] })
}

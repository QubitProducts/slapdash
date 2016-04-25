var getNative = require('./util/getNative')

module.exports = getNative('Object.keys', function keysFeatureFill (object) {
  var keys = []
  var key
  for (key in object) {
    if (object.hasOwnProperty(object, key)) {
      keys.push(key)
    }
  }
  return keys
})

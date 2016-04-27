var getNative = require('./util/getNative')

module.exports = getNative('Object.keys', function keysFeatureFill (object) {
  var keys = []
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return keys
})

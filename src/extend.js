var getNative = require('./util/getNative')

module.exports = getNative(
  'Object.assign',
  function assignFeatureFill (target) {
    var sourcesLength = arguments.length
    for (var i = 1; i < sourcesLength; i++) {
      var source = arguments[i]
      for (var j in source) {
        if (source.hasOwnProperty(j)) {
          target[j] = source[j]
        }
      }
    }

    return target
  }
)

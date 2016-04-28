var isNative = require('./util/isNative')
var objAssign = Object.assign
module.exports = isNative(objAssign)
  ? objAssign
  : function assignFeatureFill (target) {
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

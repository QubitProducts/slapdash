var isNative = require('./util/isNative')
var objKeys = Object.keys
module.exports = isNative(objKeys)
  ? objKeys
  : function keysFeatureFill (object) {
    var keys = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    return keys
  }

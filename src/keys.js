var isNative = require('./util/isNative')
var keys = Object.keys
module.exports = isNative(keys)
  ? keys
  : function keys (object) {
    var keys = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    return keys
  }

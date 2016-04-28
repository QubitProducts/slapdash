var isNative = require('./util/isNative')
var indexOf = Array.prototype.indexOf

module.exports = isNative(indexOf)
  ? function nativeIndexOf (array, item) {
    return indexOf.call(array, item)
  }
  : function indexOf (array, item) {
    var length = array.length
    for (var i = 0; i < length; i++) {
      if (array[i] === item) {
        return i
      }
    }
    return -1
  }

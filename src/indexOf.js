var isNative = require('./util/isNative')
var indexOf = Array.prototype.indexOf

module.exports = isNative(indexOf)
  ? function nativeIndexOf (array, item) {
    return indexOf.call(array, item)
  }
  : function indexOf (array, item) {
    var l = array.length
    for (var i = 0; i < l; i++) {
      if (array[i] === item) return i
    }
    return -1
  }

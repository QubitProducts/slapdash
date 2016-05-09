var isNative = require('./util/isNative')
var some = Array.prototype.some
module.exports = isNative(some)
  ? function nativeSome (array, callback, context) {
    return some.call(array, callback, context)
  }
  : function some (array, callback, context) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (callback.call(context, array[i], i, array)) return true
    }
    return false
  }

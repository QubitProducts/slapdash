var isNative = require('./util/isNative')
var every = Array.prototype.every
module.exports = isNative(every)
  ? function nativeEvery (array, callback, context) {
    return every.call(array, callback, context)
  }
  : function every (array, callback, context) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (!callback.call(context, array[i], i, array)) return false
    }
    return true
  }

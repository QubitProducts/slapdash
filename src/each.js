var isNative = require('./util/isNative')
var forEach = Array.prototype.forEach
module.exports = isNative(forEach)
  ? function nativeEach (array, callback, context) {
    return forEach.call(array, callback, context)
  }
  : function each (array, callback, context) {
    var length = array.length
    for (var i = 0; i < length; i++) {
      callback.call(context, array[i], i, array)
    }
  }

var isNative = require('./util/isNative')
var map = Array.prototype.map
module.exports = isNative(map)
  ? function nativeMap (array, callback, context) {
    return map.call(array, callback, context)
  }
  : function map (array, callback, context) {
    var length = array.length
    var output = new Array(length)
    for (var i = 0; i < length; i++) {
      output[i] = callback.call(context, array[i], i, array)
    }
    return output
  }

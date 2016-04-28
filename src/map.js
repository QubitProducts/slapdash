var isNative = require('./util/isNative')
var map = Array.prototype.map
module.exports = isNative(map)
  ? function nativeMap (array, callback, context) {
    return map.call(array, callback, context)
  }
  : function map (array, callback, context) {
    var l = array.length
    var output = new Array(l)
    for (var i = 0; i < l; i++) {
      output[i] = callback.call(context, array[i], i, array)
    }
    return output
  }

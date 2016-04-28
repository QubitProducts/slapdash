var isNative = require('./util/isNative')
var arrMap = Array.prototype.map
module.exports = isNative(arrMap)
  ? function map (array, callback, context) {
    return arrMap.call(array, callback, context)
  }
  : function mapFeaturefill (array, callback, context) {
    var length = array.length
    var output = new Array(length)
    for (var i = 0; i < length; i++) {
      output[i] = callback.call(context, array[i], i, array)
    }
    return output
  }

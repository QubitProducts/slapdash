var isNative = require('./util/isNative')
var arrForEach = Array.prototype.forEach
module.exports = isNative(arrForEach)
  ? function each (array, callback, context) {
    return arrForEach.call(array, callback, context)
  }
  : function eachFeatureFill (array, callback, context) {
    var length = array.length
    for (var i = 0; i < length; i++) {
      callback.call(context, array[i], i, array)
    }
  }

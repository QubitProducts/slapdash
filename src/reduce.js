var isNative = require('./util/isNative')
var reduce = Array.prototype.reduce
module.exports = isNative(reduce)
  ? function nativeReduce (array, callback, initialValue) {
    return reduce.call(array, callback, initialValue)
  }
  : function reduce (array, callback, initialValue) {
    var output = initialValue
    var l = array.length
    for (var i = 0; i < l; i++) output = callback(output, array[i], i, array)
    return output
  }

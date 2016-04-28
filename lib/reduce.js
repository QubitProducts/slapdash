var isNative = require('./util/isNative')
var arrReduce = Array.prototype.reduce
module.exports = isNative(arrReduce)
  ? function reduce (array, callback, initialValue) {
    return arrReduce.call(array, callback, initialValue)
  }
  : function reduceFeatureFill (array, callback, initialValue) {
    var output = initialValue
    var length = array.length

    for (var i = 0; i < length; i++) {
      output = callback(output, array[i], i, array)
    }

    return output
  }

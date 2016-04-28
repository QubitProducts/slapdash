var isNative = require('./util/isNative')
var filter = Array.prototype.filter
module.exports = isNative(filter)
  ? function nativeFilter (array, callback, context) {
    return filter.call(array, callback, context)
  }
  : function filter (array, callback, context) {
    var l = array.length
    var output = []
    for (var i = 0; i < l; i++) {
      if (callback.call(context, array[i], i, array)) output.push(array[i])
    }
    return output
  }

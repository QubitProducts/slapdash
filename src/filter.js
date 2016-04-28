var isNative = require('./util/isNative')
var filter = Array.prototype.filter
module.exports = isNative(filter)
  ? function nativeFilter (array, callback, context) {
    return filter.call(array, callback, context)
  }
  : function filter (array, callback, context) {
    var length = array.length
    var output = []
    for (var i = 0; i < length; i++) {
      if (callback.call(context, array[i], i, array)) {
        output.push(array[i])
      }
    }
    return output
  }

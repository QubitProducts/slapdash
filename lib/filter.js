var isNative = require('./util/isNative')
var arrFilter = Array.prototype.filter
module.exports = isNative(arrFilter)
  ? function filter (array, callback, context) {
    return arrFilter.call(array, callback, context)
  }
  : function filterFeaturefill (array, callback, context) {
    var length = array.length
    var output = []
    for (var i = 0; i < length; i++) {
      if (callback.call(context, array[i], i, array)) {
        output.push(array[i])
      }
    }
    return output
  }

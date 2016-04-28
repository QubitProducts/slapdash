var isNative = require('./util/isNative')
var arrFind = Array.prototype.find
module.exports = isNative(arrFind)
  ? function find (array, callback, context) {
    return arrFind.call(array, callback, context)
  }
  : function findFeaturefill (array, callback, context) {
    // Here, `this` is the array we're iterating over,
    // and `context` is passed to the `callback`
    for (var i = 0, length = array.length; i < length; i++) {
      if (callback.call(context, array[i], i, array)) return array[i]
    }
  }

var isNative = require('./util/isNative')
var find = Array.prototype.find
module.exports = isNative(find)
  ? function nativeFind (array, callback, context) {
    return find.call(array, callback, context)
  }
  : function find (array, callback, context) {
    // Here, `this` is the array we're iterating over,
    // and `context` is passed to the `callback`
    var l = array.length
    for (var i = 0; i < l; i++) {
      if (callback.call(context, array[i], i, array)) return array[i]
    }
  }

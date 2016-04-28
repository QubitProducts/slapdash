var isNative = require('./util/isNative')
var arrIndexOf = Array.prototype.indexOf

module.exports = isNative(arrIndexOf)
  ? function indexOf (array, item) {
    return arrIndexOf.call(array, item)
  }
  : function indexOfFeaturefill (array, item) {
    var length = array.length
    for (var i = 0; i < length; i++) {
      if (array[i] === item) {
        return i
      }
    }
    return -1
  }

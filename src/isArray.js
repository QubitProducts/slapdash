var isNative = require('./util/isNative')

var isArray = Array.isArray

module.exports = isNative(isArray)
  ? function nativeArray (coll) {
    return isArray(coll)
  }
  : function isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

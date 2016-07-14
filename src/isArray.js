var isNative = require('./util/isNative')

var isArray = Array.prototype.isArray

module.exports = isNative(isArray)
  ? function nativeArray (coll, pred, context) {
    return isArray.call(coll, pred, context)
  }
  : function isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

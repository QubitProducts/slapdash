var isNative = require('./util/isNative')

var some = Array.prototype.some

module.exports = isNative(some)
  ? function nativeSome (coll, pred, context) {
    return some.call(coll, pred, context)
  }
  : function some (coll, pred, context) {
    for (var i = 0; i < coll.length; i++) {
      if (pred.call(context, coll[i], i, coll)) {
        return true
      }
    }

    return false
  }

var isNative = require('./util/isNative')

var every = Array.prototype.every

module.exports = isNative(every)
  ? function nativeEvery (coll, pred, context) {
    return every.call(coll, pred, context)
  }
  : function every (coll, pred, context) {
    if (!coll || !pred) {
      throw new TypeError()
    }

    for (var i = 0; i < coll.length; i++) {
      if (!pred.call(context, coll[i], i, coll)) {
        return false
      }
    }

    return true
  }

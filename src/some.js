var isNative = require('./util/isNative')
var identity = require('./identity')
var bind = require('./bind')

module.exports = function some (coll, pred, context) {
  var nativeSome = Array.prototype.some

  if (!coll) {
    return false
  }

  if (!pred) {
    pred = identity
  } else {
    pred = bind(pred, context)
  }

  if (isNative(nativeSome)) {
    return nativeSome.call(coll, pred)
  } else {
    for (var i = 0; i < coll.length; i++) {
      if (pred(coll[i], i, coll)) {
        return true
      }
    }

    return false
  }
}

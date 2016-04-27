var getNative = require('./util/getNative')

module.exports = function find (array, callback, context) {
  return arrayFind.call(array, callback, context)
}

var arrayFind = getNative(
  'Array.prototype.find',
  function findFeaturefill (callback, context) {
    // Here, `this` is the array we're iterating over,
    // and `context` is passed to the `callback`
    for (var i = 0, length = this.length; i < length; i++) {
      if (callback.call(context, this[i], i, this)) return this[i]
    }
  }

)

var getNative = require('./util/getNative')

module.exports = function each (array, callback, context) {
  return arrayEach.call(array, callback, context)
}

var arrayEach = getNative(
  'Array.prototype.forEach',
  function eachFeatureFill (callback, context) {
    var length = this.length
    for (var i = 0; i < length; i++) {
      callback.call(context, this[i], i, this)
    }
  }
)

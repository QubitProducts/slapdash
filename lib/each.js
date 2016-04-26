var getNative = require('./util/getNative')

module.exports = function each (array, callback, context) {
  return arrayEach.call(array, callback, context)
}

var arrayEach = getNative(
  'Array.prototype.forEach',
  function eachFeatureFill (array, callback, context) {
    var length = array.length
    var i
    for (i = 0; i < length; i++) {
      callback.call(context, array[i], i, array)
    }
  }
)

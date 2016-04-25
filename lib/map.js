var getNative = require('./util/getNative')

module.exports = function map (array, callback, context) {
  return arrayMap.call(array, callback, context)
}

var arrayMap = getNative(
  'Array.prototype.map',
  function mapFeaturefill (array, callback, context) {
    var length = array.length
    var output = new Array(length)
    var i
    for (i = 0; i < length; i++) {
      output[i] = callback.call(context, array[i], i, array)
    }
    return output
  }
)

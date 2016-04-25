var getNative = require('./util/getNative')

module.exports = function reduce (array, callback, initialValue) {
  return arrayReduce.call(array, callback, initialValue)
}

var arrayReduce = getNative(
  'Array.prototype.reduce',
  function reduceFeatureFill (array, callback, initialValue) {
    var output = initialValue
    var length = array.length
    var i

    for (i = 0; i < length; i++) {
      output = callback(output, array[i], i, array)
    }

    return output
  }
)

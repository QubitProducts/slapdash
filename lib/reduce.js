var getNative = require('./util/getNative')

module.exports = function reduce (array, callback, initialValue) {
  return arrayReduce.call(array, callback, initialValue)
}

var arrayReduce = getNative(
  'Array.prototype.reduce',
  function reduceFeatureFill (callback, initialValue) {
    var output = initialValue
    var length = this.length

    for (var i = 0; i < length; i++) {
      output = callback(output, this[i], i, this)
    }

    return output
  }
)

var getNative = require('./util/getNative')

module.exports = function map (array, callback, context) {
  return arrayMap.call(array, callback, context)
}

var arrayMap = getNative(
  'Array.prototype.map',
  function mapFeaturefill (callback, context) {
    var length = this.length
    var output = new Array(length)
    for (var i = 0; i < length; i++) {
      output[i] = callback.call(context, this[i], i, this)
    }
    return output
  }
)

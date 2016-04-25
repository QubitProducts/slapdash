var getNative = require('./util/getNative')

module.exports = function filter (array, callback, context) {
  return arrayFilter.call(array, callback, context)
}

var arrayFilter = getNative(
  'Array.prototype.filter',
  function filterFeaturefill (array, callback, context) {
    var length = array.length
    var output = []
    var i
    for (i = 0; i < length; i++) {
      if (callback.call(context, array[i], i, array)) {
        output.push(array[i])
      }
    }
    return output
  }
)

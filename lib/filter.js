var getNative = require('./util/getNative')

module.exports = function filter (array, callback, context) {
  return arrayFilter.call(array, callback, context)
}

var arrayFilter = getNative(
  'Array.prototype.filter',
  function filterFeaturefill (callback, context) {
    var length = this.length
    var output = []
    for (var i = 0; i < length; i++) {
      if (callback.call(context, this[i], i, this)) {
        output.push(this[i])
      }
    }
    return output
  }
)

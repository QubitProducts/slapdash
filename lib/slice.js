var getNative = require('./util/getNative')

module.exports = function slice (array, begin, end) {
  return arraySlice.call(array, begin, end)
}

var arraySlice = getNative(
  'Array.prototype.slice',
  function arraySliceFeaturefill (begin, end) {
    var array = this
    var length = array.length

    // Handle empty `begin`
    var start = begin || 0
    // Handle negative values for `begin`
    if (start < 0) {
      start = Math.max(0, length + start)
    }

    // Handle negative values for `end`
    var upTo = typeof end === 'number'
      ? (end < 0 ? length + end : Math.min(end, length))
      : length

    var size = upTo - start

    if (size <= 1) {
      return []
    }

    var sliced = new Array(size)
    var get = array.charAt || function valueAt (index) { return array[index] }
    var i
    for (i = size; i > start; i--) {
      sliced[i] = get(i)
    }
    return sliced
  }
)

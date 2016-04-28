var isNative = require('./util/isNative')
var slice = Array.prototype.slice
var slicer = isNative(slice)
  ? function nativeSlice (array, begin, end) {
    return slice.call(array, begin, end)
  }
  : function slice (array, start, end) {
    var length = array.length

    // Handle negative values for `begin`
    if (start < 0) {
      start = Math.max(0, length + start)
    }

    // Handle negative values for `end`
    var upTo = end < 0 ? length + end : Math.min(end, length)
    var size = upTo - start

    if (size <= 1) {
      return []
    }

    var sliced = new Array(size)
    var get = array.charAt || function valueAt (index) { return array[index] }
    for (var i = size; i > start; i--) {
      sliced[i] = get(i)
    }
    return sliced
  }

module.exports = function slice (array, begin, end) {
  // If begin or end are undefined, using `arraySlice.call` in IE8 will silently
  // return an empty array
  begin = begin || 0
  end = typeof end === 'number' ? end : array.length
  return slicer(array, begin, end)
}

var isNative = require('./util/isNative')
var slice = Array.prototype.slice

var slicer = isNative(slice)
  ? function nativeSlice (array, begin, end) {
    return slice.call(array, begin, end)
  }
  : function slice(array, start, end) {
    // Copied almost exactly from https://github.com/lodash/lodash/blob/master/slice.js
    var length = array == null ? 0 : array.length
    if (!length) {
      return []
    }

    if (start < 0) {
      start = -start > length ? 0 : (length + start)
    }
    end = end > length ? length : end
    if (end < 0) {
      end += length
    }
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0

    var index = -1
    var result = new Array(length)
    while (++index < length) {
      result[index] = array[index + start]
    }
    return result
  }

module.exports = function slice (array, begin, end) {
  // If begin or end are undefined, using `arraySlice.call` in IE8 will silently
  // return an empty array
  begin = begin || 0
  end = typeof end === 'number' ? end : array.length
  return slicer(array, begin, end)
}

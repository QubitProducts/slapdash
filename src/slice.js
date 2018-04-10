var isNative = require('./util/isNative')
var slice = Array.prototype.slice

module.exports = isNative(slice)
  ? function nativeSlice (array, begin, end) {
    begin = begin || 0
    end = typeof end === 'number' ? end : array.length
    return slice.call(array, begin, end)
  }
  : function slice (array, start, end) {
    start = start || 0
    end = typeof end === 'number' ? end : array.length
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

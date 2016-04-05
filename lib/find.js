var find = typeof Array.prototype.find === 'function'
  ? function _nativeFind (array, callback, thisArg) {
    return Array.prototype.find.call(array, callback, thisArg)
  }
  : _find

function _find (array, callback, thisArg) {
  return array.reduce(function (match, curr, index) {
    if (match != null) {
      return match
    }
    if (callback.call(thisArg, curr, index, array)) {
      return curr
    }
    return undefined
  }, null)
}

module.exports = find

module.exports = Array.prototype.find ? nativeFind : find

function nativeFind (array, callback, thisArg) {
  return Array.prototype.find.call(array, callback, thisArg)
}

function find (array, callback, thisArg) {
  return array.reduce(function findReducer (match, curr, index) {
    if (match != null) {
      return match
    }
    if (callback.call(thisArg, curr, index, array)) {
      return curr
    }
    return undefined
  }, null)
}

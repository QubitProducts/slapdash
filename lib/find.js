module.exports = Array.prototype.find ? nativeFind : find

function nativeFind (array, callback, thisArg) {
  return Array.prototype.find.call(array, callback, thisArg)
}

function find (array, callback, self) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (callback.call(self, array[i], i, array)) return array[i]
  }
}

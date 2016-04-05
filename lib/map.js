module.exports = function nativeMap (array, callback, thisArg) {
  return Array.prototype.map.call(array, callback, thisArg)
}

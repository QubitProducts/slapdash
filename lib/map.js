module.exports = function nativeMap (array, callback, context) {
  return Array.prototype.map.call(array, callback, context)
}

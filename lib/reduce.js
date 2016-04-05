module.exports = function nativeReduce (array, callback, thisArg) {
  return Array.prototype.reduce.call(array, callback, thisArg)
}

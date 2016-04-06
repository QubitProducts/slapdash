module.exports = function nativeReduce (array, callback, context) {
  return Array.prototype.reduce.call(array, callback, context)
}

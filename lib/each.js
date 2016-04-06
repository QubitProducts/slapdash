module.exports = function each (array, callback, context) {
  return Array.prototype.forEach.call(array, callback, context)
}

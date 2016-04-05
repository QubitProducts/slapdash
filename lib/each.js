module.exports = function each (array, callback, thisArg) {
  return Array.prototype.forEach.call(array, callback, thisArg)
}

// Inspired heavily by https://github.com/QubitProducts/alien-bind
module.exports = function bind (method, thisArg) {
  var args = slice(arguments, 2)

  return function boundFunction () {
    return method.apply(thisArg, args.concat(slice(arguments)))
  }
}

function slice (array, offset) {
  return Array.prototype.slice.call(array, offset)
}
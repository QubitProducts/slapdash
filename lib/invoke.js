module.exports = function (array, methodName) {
  var args = Array.prototype.slice.call(arguments, 2)
  return array.map(function (value) {
    return value[methodName].apply(value, args)
  })
}

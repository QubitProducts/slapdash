module.exports = function invoke (array, methodName) {
  var args = Array.prototype.slice.call(arguments, 2)
  return array.map(function invokeMapper (value) {
    return value[methodName].apply(value, args)
  })
}

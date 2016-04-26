var slice = require('./slice')
var map = require('./map')

module.exports = function invoke (array, methodName) {
  var args = slice(arguments, 2)
  return map(array, function invokeMapper (value) {
    return value[methodName].apply(value, args)
  })
}

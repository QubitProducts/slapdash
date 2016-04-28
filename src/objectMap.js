var map = require('./map')
var keys = require('./keys')

module.exports = function objectMap (object, callback, context) {
  var result = {}
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      result[key] = callback.call(context, object[key], key, object)
    }
  }
  return result
}

module.exports.asArray = function objectMapAsArray (object, callback, context) {
  return map(keys(object), function (key) {
    return callback.call(context, object[key], key, object)
  }, context)
}

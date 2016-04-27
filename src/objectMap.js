var objectHandler = require('./util/objectHandler')
var map = require('./map')

module.exports = function objectMap (object, callback, context) {
  var result = {}
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      result[key] = callback.call(context, object[key], key, object)
    }
  }
  return result
}

module.exports.asArray = objectHandler(map)

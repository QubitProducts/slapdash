module.exports = function objectMap (object, callback, context) {
  var result = {}
  for (var key in object) {
    result[key] = callback.call(context, object[key], key, object)
  }
  return result
}

module.exports.asArray = require('./util/objectHandler')(require('./map'))

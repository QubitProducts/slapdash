module.exports = function objectMap (object, callback, thisArg) {
  var result = {}
  for (var key in object) {
    result[key] = callback.call(thisArg, object[key], key, object)
  }
  return result
}

module.exports.asArray = require('./util/objectHandler')(require('./map'))

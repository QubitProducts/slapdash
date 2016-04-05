var map = require('./map')
var objectHandler = require('./util/objectHandler')
var _map = objectHandler(map)

module.exports = function objectMap (object, callback, thisArg) {
  var result = {}
  var mapResult = _map(object, callback, thisArg)
  Object.keys(object).forEach(function (key, index) {
    result[key] = mapResult[index]
  })
  return result
}

module.exports.asArray = _map

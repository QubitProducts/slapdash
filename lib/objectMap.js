var map = require('./map')
var objectHandler = require('./util/objectHandler')
var objectMapAsArray = objectHandler(map)

module.exports = function objectMap (object, callback, thisArg) {
  var result = {}
  var mapResult = objectMapAsArray(object, callback, thisArg)
  Object.keys(object).forEach(function objectResultMapper (key, index) {
    result[key] = mapResult[index]
  })
  return result
}

module.exports.asArray = objectMapAsArray

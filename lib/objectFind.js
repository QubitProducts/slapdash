var find = require('./find')
var objectHandler = require('./util/objectHandler')
var _find = objectHandler(find)

module.exports = function (object, callback, thisArg) {
  var result = _find(object, callback, thisArg)
  return result && object[result]
}

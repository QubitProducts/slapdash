var find = require('./find')
var objectHandler = require('./util/objectHandler')
var objectFindKey = objectHandler(find)

module.exports = function objectFind (object, callback, thisArg) {
  var result = objectFindKey(object, callback, thisArg)
  return result && object[result]
}

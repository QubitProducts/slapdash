var keys = require('./keys')
var reduce = require('./reduce')

module.exports = function objectReduce (object, callback, initialValue) {
  return reduce(keys(object), function objectReducer (memo, key, index) {
    return callback(memo, object[key], key, object)
  }, initialValue)
}

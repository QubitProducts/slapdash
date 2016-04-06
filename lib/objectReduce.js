module.exports = function reduce (object, callback, initialValue) {
  return Object.keys(object).reduce(function objectReducer (memo, key, index) {
    return callback(memo, object[key], key, object)
  }, initialValue)
}

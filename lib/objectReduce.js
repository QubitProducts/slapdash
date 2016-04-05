module.exports = function reduce (object, callback, initialValue) {
  return Object.keys(object).reduce(function objectReducer (prev, curr, index) {
    return callback(prev, object[curr], curr, object)
  }, initialValue)
}

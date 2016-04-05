module.exports = function reduce (object, callback, initialValue) {
  return Object.keys(object).reduce(function objectReducer (memo, curr, index) {
    return callback(memo, object[curr], curr, object)
  }, initialValue)
}

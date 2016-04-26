module.exports = function pluck (array, key) {
  var length = array.length
  var values = new Array(length)
  for (var i = 0; i < length; i++) {
    values[i] = array[i] ? array[i][key] : undefined
  }
  return values
}

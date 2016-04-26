module.exports = function pluck (array, key) {
  var len = array.length
  var values = new Array(len)
  for (var i = 0; i < len; i++) {
    values[i] = array[i] ? array[i][key] : undefined
  }
  return values
}

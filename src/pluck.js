module.exports = function pluck (array, key) {
  var l = array.length
  var values = []
  for (var i = 0; i < l; i++) if (array[i]) values[i] = array[i][key]
  return values
}

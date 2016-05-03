module.exports = function pluck (array, key) {
  var l = array.length
  var out = []
  for (var i = 0; i < l; i++) if (array[i]) out[i] = array[i][key]
  return out
}

module.exports = function pluck (array, key) {
  return array.map(function pluckValue (value) { return value[key] })
}

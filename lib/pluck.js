module.exports = function (array, key) {
  return array.map(function (value) { return value[key] })
}

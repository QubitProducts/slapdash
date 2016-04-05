module.exports = function (array, exclude) {
  if (!exclude || !exclude.length) {
    return array
  }
  return array.filter(function (value) { return exclude.indexOf(value) === -1 })
}

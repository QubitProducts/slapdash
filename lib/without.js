module.exports = function without (array, exclude) {
  if (!exclude || !exclude.length) {
    return array
  }
  return array.filter(function filterExcluded (value) {
    return exclude.indexOf(value) === -1
  })
}

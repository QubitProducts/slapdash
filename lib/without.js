var filter = require('./filter')
module.exports = function without (array, exclude) {
  if (!exclude || !exclude.length) {
    return array
  }
  return filter(array, function filterExcluded (value) {
    return exclude.indexOf(value) === -1
  })
}

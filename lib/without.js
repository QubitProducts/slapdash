var filter = require('./filter')
var indexOf = require('./indexOf')
module.exports = function without (array, exclude) {
  if (!exclude || !exclude.length) {
    return array
  }
  return filter(array, function filterExcluded (value) {
    return indexOf(exclude, value) === -1
  })
}

var getNative = require('./util/getNative')

module.exports = function indexOf (array, item) {
  return arrayIndexOf.call(array, item)
}

var arrayIndexOf = getNative(
  'Array.prototype.indexOf',
  function indexOfFeaturefill (item) {
    var length = this.length
    for (var i = 0; i < length; i++) {
      if (this[i] === item) {
        return i
      }
    }
    return -1
  }
)

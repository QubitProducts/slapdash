var getNative = require('./util/getNative')

module.exports = function find (array, callback, context) {
  return arrayFind.call(array, callback, context)
}

var arrayFind = getNative(
  'Array.prototype.find',
  function findFeaturefill (callback, self) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (callback.call(self, this[i], i, this)) return this[i]
    }
  }

)

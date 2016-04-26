var isNative = require('../../../lib/util/isNative')

var testCases = {
  'Array.prototype.shift': true,
  'Array.prototype.unshift': true,
  'Array.prototype.pop': true,
  'Array.prototype.push': true,

  'Array.prototype.map': true,
  'Array.prototype.forEach': true,
  'Array.prototype.reduce': true
}

describe('isNative', function () {
  var i
  for (i in testCases) {
    it('should return ' + (testCases[i] ? 'true' : 'false') + ' for ' + i, function () {
      var method = tryToGetNative(i)
      var result = isNative(method)

      if (method) {
        expect(result).to.eql(testCases[i])
      }
    })
  }
})

function tryToGetNative (name) {
  var glbl = Function('return this')() // eslint-disable-line no-new-func
  var output = glbl
  var parts = name.split(/\./g)
  var len = parts.length
  var i
  for (i = 0; i < len; i++) {
    output = output[parts[i]]
  }
  return output
}

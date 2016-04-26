var getNative = require('../../../lib/util/getNative')

var testCases = [
  'Array.prototype.shift',
  'Array.prototype.unshift',
  'Array.prototype.pop',
  'Array.prototype.push',

  'Array.prototype.map',
  'Array.prototype.forEach',
  'Array.prototype.reduce',
  'Array.prototype.slice',

  'Object.assign',
  'Object.keys'
]

describe('getNative', function () {
  var i
  for (i in testCases) {
    it('should always return a function for ' + i, function () {
      var result = getNative(i, function () { })
      expect(typeof result).to.eql('function')
    })
  }
})

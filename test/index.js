var slapdash = require('../dist')
var pkg = require('../package.json')

var methods = ['assign', 'attr', 'bind', 'each', 'filter', 'find', 'identity', 'indexOf', 'invoke', 'isMatch', 'keys', 'map', 'matches', 'not', 'objectEach', 'objectMap', 'objectReduce', 'pluck', 'reduce', 'slice', 'values']

describe('bundle', function () {
  it('should have name and version', function () {
    expect(slapdash).to.have.property('name', pkg.name)
    expect(slapdash).to.have.property('version', pkg.version)
  })

  for (var i = 0; i < methods.length; i++) {
    (function (methodName) {
      describe(methodName, function () {
        it('should exist as a property of _', function () {
          expect(slapdash).to.have.property(methodName)
        })

        it('should be a function', function () {
          expect(slapdash[methodName]).to.be.a('function')
        })
      })
    }(methods[i]))
  }
})

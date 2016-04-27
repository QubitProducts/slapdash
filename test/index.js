var slapdash = require('../')

var methods = ['bind', 'each', 'extend', 'find', 'filter', 'invoke', 'map', 'objectEach', 'objectMap', 'objectReduce', 'pluck', 'reduce', 'slice', 'without']

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

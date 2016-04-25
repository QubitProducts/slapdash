var slapdash = require('../../')

var methods = ['each', 'extend', 'find', 'invoke', 'map', 'objectEach', 'objectMap', 'objectReduce', 'pluck', 'reduce', 'without']

for (var i = 0; i < methods.length; i++) {
  (function (methodName) {
    describe(methodName, function () {
      it('should exist as a property of _', function () {
        expect(slapdash).to.have.property(methodName)
      })

      it('should be a function', function () {
        expect(slapdash[methodName]).to.be.a('function')
      })

      // Browserify can suck it
      // it('should be availble in the /lib/ folder', function () {
      //   expect(require('../../lib/' + methodName + '.js')).to.equal(slapdash[methodName])
      // })
    })
  }(methods[i]))
}

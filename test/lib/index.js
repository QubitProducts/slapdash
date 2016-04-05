var slapdash = require('../../')

var methods = ['each', 'extend', 'find', 'invoke', 'map', 'objectEach', 'objectFind', 'objectMap', 'objectReduce', 'pluck', 'reduce', 'without']

methods.forEach(function (methodName) {
  describe(methodName, function () {
    it('should exist as a property of _', function () {
      expect(slapdash).to.have.property(methodName)
    })

    it('should be a function', function () {
      expect(slapdash[methodName]).to.be.a('function')
    })

    it('should be availble in the /lib/ folder', function () {
      expect(require('../../lib/' + methodName)).to.equal(slapdash[methodName])
    })
  })
})

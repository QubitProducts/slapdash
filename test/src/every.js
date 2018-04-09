module.exports = function (every) {
  describe('every', function () {
    var identity

    before(function () {
      identity = require('../../src/identity')
    })

    it('should return true where all match', function () {
      expect(every([1, 2, 3, 4], isPositive)).to.be(true)
    })

    it('should return false where only some match', function () {
      expect(every([1, 0, 0, 0], isPositive)).to.be(false)
      expect(every([0, 1, 0, 0], isPositive)).to.be(false)
      expect(every([0, 0, 1, 0], isPositive)).to.be(false)
      expect(every([0, 0, 0, 1], isPositive)).to.be(false)
    })

    it('should return false when nothing matches', function () {
      expect(every([0, 0, 0, 0], isPositive)).to.be(false)
    })

    it('should return true for empty sets', function () {
      expect(every([], isPositive)).to.be(true)
    })

    it('should throw when given bad arguments', function () {
      expect(every).to.throwException()
      expect(every).withArgs(null).to.throwException()
      expect(every).withArgs([]).to.throwException()
      expect(every).withArgs([], isPositive).to.not.throwException()
    })

    it('should return false for non-matches', function () {
      expect(every([false, 0, ''], identity)).to.be(false)
      expect(every([false, 0, ''], is(1))).to.be(false)
    })

    it('should return true for matches', function () {
      expect(every([true, 1, 'slopdish'], identity)).to.be(true)
      expect(every([1, 1, 1], is(1))).to.be(true)
    })

    it('applies context correctly', function () {
      var pred = sinon.spy()
      var context = {
        foo: true
      }
      every([1, 2, 3], pred, context)
      sinon.assert.calledOn(pred, context)
    })
  })

  function isPositive (n) {
    return n > 0
  }

  function is (a) {
    return function (b) {
      return a === b
    }
  }
}

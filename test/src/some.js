var describeMethod = require('../describeMethod')
var identity = require('../../src/identity')

function isPositive (n) {
  return n > 0
}

function is (a) {
  return function (b) {
    return a === b
  }
}

describeMethod('some', function (some) {
  it('should return true where all match', function () {
    expect(some([1, 2, 3, 4], isPositive)).to.be(true)
  })

  it('should return true where some match', function () {
    expect(some([1, 0, 0, 0], isPositive)).to.be(true)
    expect(some([0, 1, 0, 0], isPositive)).to.be(true)
    expect(some([0, 0, 1, 0], isPositive)).to.be(true)
    expect(some([0, 0, 0, 1], isPositive)).to.be(true)
  })

  it('should return false when nothing matches', function () {
    expect(some([0, 0, 0, 0], isPositive)).to.be(false)
  })

  it('should return false for empty sets', function () {
    expect(some([], isPositive)).to.be(false)
  })

  it('should throw when given bad arguments', function () {
    expect(some).to.throwException()
    expect(some).withArgs(null).to.throwException()
    expect(some).withArgs([]).to.throwException()
    expect(some).withArgs([], isPositive).to.not.throwException()
  })

  it('should return false for non-matches', function () {
    expect(some([false, 0, ''], identity)).to.be(false)
    expect(some([false, 0, ''], is(1))).to.be(false)
  })

  it('should return true for matches', function () {
    expect(some([false, 1, ''], identity)).to.be(true)
    expect(some([false, 1, ''], is(1))).to.be(true)
  })

  it('applies context correctly', function () {
    var pred = sinon.spy()
    var context = {
      foo: true
    }
    some([1, 2, 3], pred, context)
    sinon.assert.calledOn(pred, context)
  })
})

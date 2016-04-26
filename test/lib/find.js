var find = require('../../lib/find')

describe('find', function () {
  var array = [1, 10, 100]
  var context = { success: true }
  var callback, result

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value > 9 })
    result = find(array, callback, context)
  })

  it('should call `callback` for each element of `array`, until a match is found', function () {
    expect(callback.callCount).to.equal(2)
    var calls = callback.getCalls()
    for (var i = 0; i < calls.length; i++) {
      sinon.assert.calledWithExactly(calls[i], array[i], i, array)
    }
  })

  it('should call `callback` bound on `context`', function () {
    sinon.assert.alwaysCalledOn(callback, context)
  })

  it('should return the first value that matches', function () {
    expect(result).to.equal(array[1])
  })

  describe('when no value matches', function () {
    it('should return undefined', function () {
      expect(find(array, function () { return false })).to.be.an('undefined')
    })
  })
})

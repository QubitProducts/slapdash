var reduce = require('../../lib/reduce')

var array = [ 1, 2, 3 ]

describe('reduce', function () {
  var callback, actual

  beforeEach(function () {
    callback = sinon.spy(function (prev, next) { return next + prev })
    actual = reduce(array, callback, 0)
  })

  it('should call `callback` once for each element of `array`', function () {
    sinon.assert.calledThrice(callback)
    callback.getCalls().forEach(function (call, index, calls) {
      if (index === 0) {
        sinon.assert.calledWithExactly(call, 0, array[index], index, array)
      } else {
        sinon.assert.calledWithExactly(call, calls[index - 1].returnValue, array[index], index, array)
      }
    })
  })

  it('should return the reduced value', function () {
    expect(actual).to.equal(6)
  })
})

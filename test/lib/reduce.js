var reduce = require('../../src/reduce')

var array = [ 1, 2, 3 ]

describe('reduce', function () {
  var callback, actual

  beforeEach(function () {
    callback = sinon.spy(function (memo, value) { return memo + value })
    actual = reduce(array, callback, 0)
  })

  it('should call `callback` once for each element of `array`', function () {
    expect(callback.callCount).to.equal(array.length)
    var calls = callback.getCalls()
    for (var i = 0; i < calls.length; i++) {
      var memo = i > 0 ? calls[i - 1].returnValue : 0
      sinon.assert.calledWithExactly(calls[i], memo, array[i], i, array)
    }
  })

  it('should return the reduced value', function () {
    var sum = 0
    for (var i = 0, length = array.length; i < length; i++) {
      sum += array[i]
    }
    expect(actual).to.equal(sum)
  })
})

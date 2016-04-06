var reduce = require('../../lib/reduce')

var array = [ 1, 2, 3 ]

describe('reduce', function () {
  var callback, actual

  beforeEach(function () {
    callback = sinon.spy(function (memo, value) { return memo + value })
    actual = reduce(array, callback, 0)
  })

  it('should call `callback` once for each element of `array`', function () {
    expect(callback.callCount).to.equal(array.length)
    callback.getCalls().forEach(function (call, index, calls) {
      var memo = index > 0 ? calls[index - 1].returnValue : 0
      sinon.assert.calledWithExactly(call, memo, array[index], index, array)
    })
  })

  it('should return the reduced value', function () {
    var sum = 0
    for (var i = 0, len = array.length; i < len; i++) {
      sum += array[i]
    }
    expect(actual).to.equal(sum)
  })
})

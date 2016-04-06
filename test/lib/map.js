var map = require('../../lib/map')

var array = [ 1, 2, 3 ]

describe('map', function () {
  var callback, context, actual

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value * 2 })
    context = { success: true }
    actual = map(array, callback, context)
  })

  it('should call `callback` once for each element of `array`', function () {
    sinon.assert.calledThrice(callback)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, array[index], index, array)
    })
  })

  it('should call `callback`, bound to `context`', function () {
    sinon.assert.alwaysCalledOn(callback, context)
  })

  it('should return a new array', function () {
    expect(actual).to.eql([ 2, 4, 6 ])
  })
})

var map = require('../../lib/map')

var array = [ 1, 2, 3 ]

describe('map', function () {
  var callback, thisArg, actual

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value * 2 })
    thisArg = { success: true }
    actual = map(array, callback, thisArg)
  })

  it('should call `callback` once for each element of `array`', function () {
    sinon.assert.calledThrice(callback)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, array[index], index, array)
    })
  })

  it('should call `callback`, bound to `thisArg`', function () {
    sinon.assert.alwaysCalledOn(callback, thisArg)
  })

  it('should return a new array', function () {
    expect(actual).to.eql([ 2, 4, 6 ])
  })
})

var each = require('../../lib/each')

var array = [ 'hello', 'there', 'tests' ]

describe('each', function () {
  var callback, thisArg

  beforeEach(function () {
    callback = sinon.spy()
    thisArg = { success: true }
    each(array, callback, thisArg)
  })

  it('should call `callback` once for each element of `array`', function () {
    expect(callback.callCount).to.equal(array.length)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, array[index], index, array)
    })
  })

  it('should call `callback`, bound to `thisArg`', function () {
    sinon.assert.alwaysCalledOn(callback, thisArg)
  })

  it('should always return `undefined`', function () {
    callback.getCalls().forEach(function (call) {
      expect(call.returnValue).to.equal(undefined)
    })
  })
})

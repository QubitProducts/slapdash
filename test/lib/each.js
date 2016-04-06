var each = require('../../lib/each')

var array = [ 'hello', 'there', 'tests' ]

describe('each', function () {
  var callback, context

  beforeEach(function () {
    callback = sinon.spy()
    context = { success: true }
    each(array, callback, context)
  })

  it('should call `callback` once for each element of `array`', function () {
    expect(callback.callCount).to.equal(array.length)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, array[index], index, array)
    })
  })

  it('should call `callback`, bound to `context`', function () {
    sinon.assert.alwaysCalledOn(callback, context)
  })

  it('should always return `undefined`', function () {
    callback.getCalls().forEach(function (call) {
      expect(call.returnValue).to.equal(undefined)
    })
  })
})

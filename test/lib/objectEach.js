var objectEach = require('../../lib/objectEach')

var object = {
  hello: 'world',
  awesome: 'yes',
  slap: 'dash'
}

var keys = ['hello', 'awesome', 'slap']
var values = ['world', 'yes', 'dash']

describe('objectEach', function () {
  var callback, context

  beforeEach(function () {
    callback = sinon.spy()
    context = { success: true }
    objectEach(object, callback, context)
  })

  it('should call `callback` once for each element of `object`', function () {
    expect(callback.callCount).to.equal(keys.length)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, values[index], keys[index], object)
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

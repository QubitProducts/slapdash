var objectEach = require('../src/objectEach')

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

    var calls = callback.getCalls()
    for (var i = 0; i < calls.length; i++) {
      sinon.assert.calledWithExactly(calls[i], values[i], keys[i], object)
    }
  })

  it('should call `callback`, bound to `context`', function () {
    sinon.assert.alwaysCalledOn(callback, context)
  })

  it('should always return `undefined`', function () {
    var calls = callback.getCalls()
    for (var i = 0; i < calls.length; i++) {
      expect(calls[i].returnValue).to.equal(undefined)
    }
  })
})

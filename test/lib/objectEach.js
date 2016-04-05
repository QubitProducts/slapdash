var objectEach = require('../../lib/objectEach')

var object = {
  hello: 'world',
  awesome: 'yes',
  slap: 'dash'
}

var keys = Object.keys(object)
var values = keys.map(function (key) { return object[key] })

describe('objectEach', function () {
  var callback, thisArg

  beforeEach(function () {
    callback = sinon.spy()
    thisArg = { success: true }
    objectEach(object, callback, thisArg)
  })

  it('should call `callback` once for each element of `object`', function () {
    sinon.assert.calledThrice(callback)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, values[index], keys[index], object)
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

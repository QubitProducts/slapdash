var objectMap = require('../../lib/objectMap')

var object = { a: 1, b: 2, c: 3 }

var keys = Object.keys(object)
var values = keys.map(function (key) { return object[key] })

describe('objectMap', function () {
  var callback, thisArg, result

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value * 2 })
    thisArg = { success: true }
    result = objectMap(object, callback, thisArg)
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

  it('should return a new object', function () {
    expect(result).to.eql({ a: 2, b: 4, c: 6 })
  })

  describe('asArray', function () {
    it('should return a new array', function () {
      result = objectMap.asArray(object, callback, thisArg)
      expect(result).to.eql([ 2, 4, 6 ])
    })
  })
})

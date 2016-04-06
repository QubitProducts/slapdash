var objectMap = require('../../lib/objectMap')

var object = { a: 1, b: 2, c: 3 }

var keys = Object.keys(object)
var values = keys.map(function (key) { return object[key] })

describe('objectMap', function () {
  var callback, context, result

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value * 2 })
    context = { success: true }
    result = objectMap(object, callback, context)
  })

  it('should call `callback` once for each element of `object`', function () {
    expect(callback.callCount).to.equal(values.length)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, values[index], keys[index], object)
    })
  })

  it('should call `callback`, bound to `context`', function () {
    sinon.assert.alwaysCalledOn(callback, context)
  })

  it('should return a new object', function () {
    expect(result).to.not.equal(object)
  })

  it('should have applied `callback` to each value of `object`', function () {
    expect(result).to.eql({ a: 2, b: 4, c: 6 })
  })

  describe('asArray', function () {
    it('should return a new array', function () {
      result = objectMap.asArray(object, callback, context)
      expect(result).to.not.equal(object)
      expect(result).to.eql([ 2, 4, 6 ])
    })
  })
})

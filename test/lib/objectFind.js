var objectFind = require('../../lib/objectFind')

describe('objectFind', function () {
  var object = { a: 1, b: 10, c: 100 }
  var keys = Object.keys(object)
  var values = keys.map(function (key) { return object[key] })

  var thisArg = { success: true }
  var callback, result

  beforeEach(function () {
    callback = sinon.spy(function (value) { return value > 9 })
    result = objectFind(object, callback, thisArg)
  })

  it('should call `callback` for each element of `object`, until a match is found', function () {
    sinon.assert.calledTwice(callback)
    callback.getCalls().forEach(function (call, index) {
      sinon.assert.calledWithExactly(call, values[index], keys[index], object)
    })
  })

  it('should call `callback` bound on `thisArg`', function () {
    sinon.assert.alwaysCalledOn(callback, thisArg)
  })

  it('should return the first value that matches', function () {
    expect(result).to.eql(10)
  })

  describe('when no value matches', function () {
    it('should return undefined', function () {
      expect(objectFind(object, function () { return false })).to.be.an('undefined')
    })
  })
})

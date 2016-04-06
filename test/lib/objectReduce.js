var objectReduce = require('../../lib/objectReduce')

var object = { a: 1, b: 2, c: 3 }

var keys = Object.keys(object)
var values = keys.map(function (key) { return object[key] })

describe('objectReduce', function () {
  var callback, actual

  beforeEach(function () {
    callback = sinon.spy(function (prev, next) { return next + prev })
    actual = objectReduce(object, callback, 0)
  })

  it('should call `callback` once for each element of `object`', function () {
    expect(callback.callCount).to.equal(3)
    callback.getCalls().forEach(function (call, index, calls) {
      sinon.assert.calledWithExactly(
        call,
        index > 0 ? calls[index - 1].returnValue : 0,
        values[index],
        keys[index],
        object
      )
    })
  })

  it('should return the reduce value', function () {
    expect(actual).to.equal(6)
  })
})

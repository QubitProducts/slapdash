var objectReduce = require('../src/objectReduce')
var each = require('../src/each')

var object = { a: 1, b: 2, c: 3 }
var values = [1, 2, 3]
var keys = ['a', 'b', 'c']

describe('objectReduce', function () {
  var callback, actual

  beforeEach(function () {
    callback = sinon.spy(function (prev, next) { return next + prev })
    actual = objectReduce(object, callback, 0)
  })

  it('should call `callback` once for each element of `object`', function () {
    expect(callback.callCount).to.equal(3)
    each(callback.getCalls(), function (call, index, calls) {
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

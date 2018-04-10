module.exports = function (objectReduce) {
  describe('objectReduce', function () {
    var object = { a: 1, b: 2, c: 3 }
    var values = [1, 2, 3]
    var keys = ['a', 'b', 'c']
    var callback, actual

    beforeEach(function () {
      callback = sinon.spy(function (prev, next) { return next + prev })
      actual = objectReduce(object, callback, 0)
    })

    it('should call `callback` once for each element of `object`', function () {
      expect(callback.callCount).to.equal(3)
      var calls = callback.getCalls()
      for (var i = 0, l = calls.length; i < l; i++) {
        sinon.assert.calledWithExactly(
          calls[i],
          i > 0 ? calls[i - 1].returnValue : 0,
          values[i],
          keys[i],
          object
        )
      }
    })

    it('should return the reduce value', function () {
      expect(actual).to.equal(6)
    })
  })
}

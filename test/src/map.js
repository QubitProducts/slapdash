module.exports = function (map) {
  describe('map', function () {
    var array = [ 1, 2, 3 ]
    var callback, context, actual

    beforeEach(function () {
      callback = sinon.spy(function (value) { return value * 2 })
      context = { success: true }
      actual = map(array, callback, context)
    })

    it('should call `callback` once for each element of `array`', function () {
      expect(callback.callCount).to.equal(array.length)
      var calls = callback.getCalls()
      for (var i = 0; i < calls.length; i++) {
        sinon.assert.calledWithExactly(calls[i], array[i], i, array)
      }
    })

    it('should call `callback`, bound to `context`', function () {
      sinon.assert.alwaysCalledOn(callback, context)
    })

    it('should return a new array', function () {
      expect(actual).to.not.equal(array)
      expect(actual).to.eql([ 2, 4, 6 ])
    })
  })
}

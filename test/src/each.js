module.exports = function (each) {
  describe('each', function () {
    var array = [ 'hello', 'there', 'tests' ]
    var callback, context

    beforeEach(function () {
      callback = sinon.spy()
      context = { success: true }
      each(array, callback, context)
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

    it('should always return `undefined`', function () {
      var calls = callback.getCalls()
      for (var i = 0; i < calls.length; i++) {
        expect(calls[i].returnValue).to.equal(undefined)
      }
    })
  })
}

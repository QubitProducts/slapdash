var describeMethod = require('../describeMethod')

describeMethod('every', function (every) {
  // For truthy/falsey tests
  function toBool (arg) { return !!arg }
  var truthy = [ true, 1, 'hello', [], {} ]
  var falsey = [ false, 0, '', NaN ]

  // A more complex test
  function startsWithH (str) { return str[0] === 'h' }
  var mixed = [ 'hello', 'henry', 'how', 'are', 'you' ]

  // Runtime vars for tests
  var array, callback, context, result

  function setupFor (thisArray, thisCallback) {
    return function setup () {
      array = thisArray
      callback = sinon.spy(thisCallback)
      context = { success: true }
      result = every(array, callback, context)
    }
  }

  afterEach(function reset () { array = result = null })

  describe('with a truthy array', function () {
    beforeEach(setupFor(truthy, toBool))

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

    it('should return `true`', function () {
      expect(result).to.equal(true)
    })
  })

  describe('with a falsey array', function () {
    beforeEach(setupFor(falsey, toBool))

    it('should call `callback` once only', function () {
      expect(callback.callCount).to.equal(1)
      var calls = callback.getCalls()
      sinon.assert.calledWithExactly(calls[0], array[0], 0, array)
    })

    it('should call `callback`, bound to `context`', function () {
      sinon.assert.alwaysCalledOn(callback, context)
    })

    it('should return `false`', function () {
      expect(result).to.equal(false)
    })
  })

  describe('with a mixed array', function () {
    beforeEach(setupFor(mixed, startsWithH))

    it('should call `callback` 4 times', function () {
      expect(callback.callCount).to.equal(4)
      var calls = callback.getCalls()
      for (var i = 0; i < calls.length; i++) {
        sinon.assert.calledWithExactly(calls[i], array[i], i, array)
      }
    })

    it('should call `callback`, bound to `context`', function () {
      sinon.assert.alwaysCalledOn(callback, context)
    })

    it('should return `false`', function () {
      expect(result).to.equal(false)
    })
  })
})

var describeMethod = require('../describeMethod')

describeMethod('pick', function (pick) {
  var result, object, toPick

  function setupFor (_object, _toPick) {
    return function setup () {
      object = _object
      toPick = _toPick
      result = pick(object, toPick)
    }
  }

  describe('with an empty object', function () {
    beforeEach(setupFor({}, []))

    it('should return an empty object', function () {
      expect(result).to.eql({})
    })
  })

  describe('with a simple object', function () {
    beforeEach(setupFor({ a: 1, b: 2, c: 3 }, ['b', 'c']))

    it('should return the requested keys', function () {
      expect(result).to.eql({ b: 2, c: 3 })
    })
  })

  describe('with missing keys', function () {
    beforeEach(setupFor({ a: 1, b: 2, c: 3 }, ['d']))

    it('should not include those keys in the returned object', function () {
      expect(result).to.eql({})
    })
  })
})

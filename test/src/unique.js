module.exports = function (unique) {
  describe('unique', function () {
    var result, array

    describe('with an empty array', function () {
      beforeEach(setupFor([]))

      it('should return an empty array', function () {
        expect(result).to.eql([])
      })
    })

    describe('with a simple array', function () {
      beforeEach(setupFor(['a', 'b', 'c']))

      it('should return that array', function () {
        expect(result).to.eql(['a', 'b', 'c'])
      })
    })

    describe('with an array with redundant values', function () {
      beforeEach(setupFor(['a', 'a', 'a', 'b', 'b', 'c', 'd']))

      it('should return the unique values', function () {
        expect(result).to.eql(['a', 'b', 'c', 'd'])
      })
    })

    describe('with an array of distinct objects', function () {
      var a = {}
      var b = {}
      var c = {}
      beforeEach(setupFor([a, b, c]))

      it('should return those objects', function () {
        expect(result[0]).to.equal(a)
        expect(result[1]).to.equal(b)
        expect(result[2]).to.equal(c)
        expect(result.length).to.equal(3)
      })
    })

    describe('with an array of identical objects', function () {
      var a = {}
      var b = a
      var c = a
      beforeEach(setupFor([a, b, c]))

      it('should return one instance of that object', function () {
        expect(result[0]).to.equal(a)
        expect(result.length).to.equal(1)
      })
    })

    function setupFor (_array) {
      return function setup () {
        array = _array
        result = unique(array)
      }
    }
  })
}

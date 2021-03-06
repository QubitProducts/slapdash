module.exports = function (isArray) {
  describe('isArray', function () {
    it('should return true if argument is an array', function () {
      var obj = ['obj']
      expect(isArray(obj)).to.equal(true)
    })

    it('should return false if argument is an arguments object', function () {
      expect(isArray(arguments)).to.equal(false)
    })

    it('should return false if argument is an object', function () {
      var obj = {'a': 1, 'b': 2}
      expect(isArray(obj)).to.equal(false)
    })

    it('should return false if argument is a string', function () {
      var obj = 'obj'
      expect(isArray(obj)).to.equal(false)
    })

    it('should return false if given an int', function () {
      var obj = 1
      expect(isArray(obj)).to.equal(false)
    })

    it('should return false if undefined', function () {
      var obj
      expect(isArray(obj)).to.equal(false)
    })

    it('should return false if null', function () {
      var obj = null
      expect(isArray(obj)).to.equal(false)
    })
  })
}

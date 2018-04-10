module.exports = function (isObject) {
  describe('isObject', function () {
    it('should return true if argument is an object', function () {
      var obj = {'a': 1, 'b': 2}
      expect(isObject(obj)).to.equal(true)
    })

    it('should return true if argument is an array', function () {
      var obj = ['obj']
      expect(isObject(obj)).to.equal(true)
    })

    it('should return false if argument is a string', function () {
      var obj = 'obj'
      expect(isObject(obj)).to.equal(false)
    })

    it('should return false if given an int', function () {
      var obj = 1
      expect(isObject(obj)).to.equal(false)
    })

    it('should return false if undefined', function () {
      var obj
      expect(isObject(obj)).to.equal(false)
    })

    it('should return false if null', function () {
      var obj = null
      expect(isObject(obj)).to.equal(false)
    })
  })
}

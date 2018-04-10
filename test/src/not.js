module.exports = function (not) {
  describe('not', function () {
    var falsey = [false, 0, null, undefined, '']
    var truthy = [true, 1, {}, [], 'hello']

    it('should return `true` for falsey values', function () {
      for (var i = 0, l = falsey.length; i < l; i++) {
        expect(not(falsey[i])).to.eql(true)
      }
    })

    it('should return `true` for truthy values', function () {
      for (var i = 0, l = truthy.length; i < l; i++) {
        expect(not(truthy[i])).to.eql(false)
      }
    })
  })
}

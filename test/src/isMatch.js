module.exports = function (isMatch) {
  describe('isMatch', function () {
    var matchAgainst = {'a': 1, 'b': 2}

    it('should return true if every property matches', function () {
      expect(isMatch(matchAgainst, matchAgainst)).to.equal(true)
    })

    it('should return false if any property doesn\'t match', function () {
      expect(isMatch({'a': 2, 'b': 2}, matchAgainst)).to.equal(false)
    })

    it('should return false if any property is missing in obj', function () {
      expect(isMatch({'b': 2}, matchAgainst)).to.equal(false)
    })
  })
}

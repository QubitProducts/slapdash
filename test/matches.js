var matches = require('../src/matches')

var matchAgainst = {'a': 1, 'b': 2}

describe('matches', function () {
  var matcher

  afterEach(function () {
    matcher = false
  })

  describe('when given an object', function () {
    beforeEach(function () {
      matcher = matches(matchAgainst)
    })

    it('should return a function', function () {
      expect(matcher).to.be.a('function')
    })

    describe('returned function', function () {
      it('should return true if every property matches', function () {
        expect(matcher(matchAgainst)).to.equal(true)
      })

      it('should return false if any property doesn\'t match', function () {
        expect(matcher({'a': 2, 'b': 2})).to.equal(false)
      })

      it('should return false if any property is missing in obj', function () {
        expect(matcher({'b': 2})).to.equal(false)
      })
    })
  })
})

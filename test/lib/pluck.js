var pluck = require('../../lib/pluck')

var array = [ { b: 2, a: 1 }, { a: 2 }, { b: 3 } ]

describe('pluck', function () {
  var actual

  beforeEach(function () {
    actual = pluck(array, 'a')
  })

  it('should return an array of same length', function () {
    expect(actual).to.be.an('array')
    expect(actual).to.have.length(3)
    expect(actual).to.eql([ 1, 2, undefined ])
  })
})

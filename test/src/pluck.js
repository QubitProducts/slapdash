var describeMethod = require('../describeMethod')

describeMethod('pluck', function (pluck) {
  var array = [ { b: 2, a: 1 }, { a: 2 }, { b: 3 } ]
  var actual

  beforeEach(function () {
    actual = pluck(array, 'a')
  })

  it('should return an array of same length', function () {
    expect(actual).to.be.an('array')
    expect(actual).to.have.length(array.length)
    expect(actual[0]).to.eql(1)
    expect(actual[1]).to.eql(2)
    expect(actual[2]).to.eql(undefined)
  })
})

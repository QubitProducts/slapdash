var identity = require('../src/identity')

describe('identity', function () {
  it('should return what it is given', function () {
    expect(identity('hello')).to.eql('hello')
  })
})

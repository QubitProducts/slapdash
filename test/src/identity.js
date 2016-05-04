var describeMethod = require('../describeMethod')

describeMethod('identity', function (identity) {
  it('should return what it is given', function () {
    expect(identity('hello')).to.eql('hello')
  })
})

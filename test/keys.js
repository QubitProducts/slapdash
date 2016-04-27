var keys = require('../src/keys')

describe('keys', function () {
  var object = { z: 0, a: 1, b: 2, c: 3 }
  var array = ['z', 'a', 'b', 'c']

  it('should return the keys of an object', function () {
    expect(keys(object)).to.eql(['z', 'a', 'b', 'c'])
  })

  it('should return the keys of an array', function () {
    expect(keys(array)).to.eql(['0', '1', '2', '3'])
  })
})

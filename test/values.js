var values = require('../src/values')

describe('values', function () {
  var object = { y: 'z', x: 'a', f: 'b', h: 'c' }
  var array = ['z', 'a', 'b', 'c']

  it('should return the values of an object', function () {
    expect(values(object)).to.eql(['z', 'a', 'b', 'c'])
  })

  it('should return the values of an array', function () {
    expect(values(array)).to.eql(['z', 'a', 'b', 'c'])
  })
})

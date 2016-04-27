var without = require('../src/without')

var array = [ 'hello', 'there', 'tests' ]

describe('without', function () {
  it('should filter out multiple elements', function () {
    expect(without(array, ['hello'])).to.eql(['there', 'tests'])
  })

  it('should also filter out multiple elements', function () {
    expect(without(array, array)).to.eql([])
  })

  it('should not filter non-existant elements', function () {
    expect(without(array, ['shoop', 'da', 'woop'])).to.eql(array)
  })
})

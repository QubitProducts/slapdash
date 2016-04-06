var extend = require('../../lib/extend')

describe('extend', function () {
  var target
  var sources = [
    { hello: 'world' },
    { hello: 'mother' },
    { hello: 'father' },
    { here: 'i am', at: 'camp granada' }
  ]

  beforeEach(function () {
    target = { hello: 'there' }
  })

  it('should return the target object', function () {
    expect(extend(target)).to.eql(target)
  })

  it('should override the target object with the source object', function () {
    expect(extend(target, sources[0])).to.eql({ hello: 'world' })
  })

  it('should override from left to right', function () {
    expect(extend(target, sources[0], sources[1])).to.eql({ hello: 'mother' })
  })

  it('should extend missing keys', function () {
    expect(extend(target, sources[0], sources[1], sources[2], sources[3])).to.eql({
      hello: 'father',
      here: 'i am',
      at: 'camp granada'
    })
  })
})

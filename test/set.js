var set = require('../src/set')

describe('set', function () {
  var obj

  beforeEach(function () {
    obj = {
      a: 'b',
      c: {
        d: 'e',
        f: {
          g: 'h',
          i: ['j', 'k', 'l']
        }
      }
    }
  })

  afterEach(function () {
    obj = null
  })

  it('should set a single key', function () {
    set(obj, 'a', 'm')
    expect(obj.a).to.eql('m')
  })

  it('should set a nested key', function () {
    set(obj, 'c.f.g', 'n')
    expect(obj.c.f.g).to.eql('n')
  })

  it('should set a numeric key', function () {
    set(obj, 'c.f.i.2', 'o')
    expect(obj.c.f.i[2]).to.eql('o')
  })
})

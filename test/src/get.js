var describeMethod = require('../describeMethod')

describeMethod('get', function (get) {
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

  it('should get a single key', function () {
    expect(get(obj, 'a')).to.eql(obj.a)
  })

  it('should get a nested key', function () {
    expect(get(obj, 'c.f.g')).to.eql(obj.c.f.g)
  })

  it('should get a numeric key', function () {
    expect(get(obj, 'c.f.i.2')).to.eql(obj.c.f.i[2])
  })
})

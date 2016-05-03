var attr = require('../src/attr')

describe('attr', function () {
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

  describe('as a getter', function () {
    it('should get a single key', function () {
      expect(attr(obj, 'a')).to.eql(obj.a)
    })

    it('should get a nested key', function () {
      expect(attr(obj, 'c.f.g')).to.eql(obj.c.f.g)
    })

    it('should get a numeric key', function () {
      expect(attr(obj, 'c.f.i.2')).to.eql(obj.c.f.i[2])
    })
  })

  describe('as a setter', function () {
    it('should set a single key', function () {
      attr(obj, 'a', 'm')
      expect(obj.a).to.eql('m')
    })

    it('should set a nested key', function () {
      attr(obj, 'c.f.g', 'n')
      expect(obj.c.f.g).to.eql('n')
    })

    it('should set a numeric key', function () {
      attr(obj, 'c.f.i.2', 'o')
      expect(obj.c.f.i[2]).to.eql('o')
    })
  })
})

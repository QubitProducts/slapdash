var describeMethod = require('../describeMethod')

describeMethod('get', function (get) {
  var obj

  afterEach(function () {
    obj = null
  })

  describe('on an object', function () {
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

  describe('on an array', function () {
    beforeEach(function () {
      obj = [
        'a',
        { b: 'c',
          d: {
            f: {
              g: 'h',
              i: ['j', 'k', 'l']
            }
          }
        }
      ]
    })

    it('should get a single key', function () {
      expect(get(obj, '0')).to.eql(obj[0])
    })

    it('should get a nested key', function () {
      expect(get(obj, '1.d.f')).to.eql(obj[1].d.f)
    })
  })

  describe('on a function', function () {
    beforeEach(function () {
      obj = function () {}
      obj.a = 'b'
      obj.d = {
        f: {
          g: 'h',
          i: ['j', 'k', 'l']
        }
      }
    })

    it('should get a single key', function () {
      expect(get(obj, 'a')).to.eql(obj.a)
    })

    it('should get a nested key', function () {
      expect(get(obj, 'd.f.i.1')).to.eql(obj.d.f.i[1])
    })
  })
})

var describeMethod = require('../describeMethod')

describeMethod('set', function (set) {
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

    describe('where path does not exist', function () {
      beforeEach(function () {
        obj = {}
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

    it('should set a single key', function () {
      set(obj, '0', 'a')
      expect(obj[0]).to.eql('a')
    })

    it('should set a nested key', function () {
      set(obj, '1.d.f', 'b')
      expect(obj[1].d.f).to.eql('b')
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

    it('should set a single key', function () {
      set(obj, 'a', 'b')
      expect(obj.a).to.eql('b')
    })

    it('should set a nested key', function () {
      set(obj, 'd.f.i.1', 'c')
      expect(obj.d.f.i[1]).to.eql('c')
    })
  })
})

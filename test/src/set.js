module.exports = function (set) {
  describe('set', function () {
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

      it('should work with arrays treated as objects', function () {
        var expected = []
        expected.c = {
          f: {
            i: {
              2: 'o'
            }
          }
        }
        expect(set([], 'c.f.i.2', 'o')).to.eql(expected)
      })

      describe('where object is a primitive', function () {
        it('should return object', function () {
          expect(set(null, 'c.f.i.2', 'o')).to.eql(null)
          expect(set(undefined, 'c.f.i.2', 'o')).to.eql(undefined)
          expect(set(true, 'c.f.i.2', 'o')).to.eql(true)
          expect(set(5, 'c.f.i.2', 'o')).to.eql(5)
        })
      })

      describe('where intemediary path is a primitive', function () {
        it('should return object', function () {
          expect(set({ a: 1 }, 'a.b.c', 1)).to.eql({
            a: {
              b: {
                c: 1
              }
            }
          })
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
}

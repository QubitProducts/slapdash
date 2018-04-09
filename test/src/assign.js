module.exports = function (assign) {
  describe('assign', function () {
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
      expect(assign(target)).to.eql(target)
    })

    it('should override the target object with the source object', function () {
      expect(assign(target, sources[0])).to.eql({ hello: 'world' })
    })

    it('should override from left to right', function () {
      expect(assign(target, sources[0], sources[1])).to.eql({ hello: 'mother' })
    })

    it('should assign missing keys', function () {
      expect(assign(target, sources[0], sources[1], sources[2], sources[3])).to.eql({
        hello: 'father',
        here: 'i am',
        at: 'camp granada'
      })
    })
  })
}

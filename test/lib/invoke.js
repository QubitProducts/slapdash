var invoke = require('../../lib/invoke')

describe('invoke', function () {
  var callback

  beforeEach(function () {
    callback = sinon.spy(function () { return { success: true } })
  })

  it('should invoke methods on object literals', function () {
    var array = [{ a: callback }]
    invoke(array, 'a')
    sinon.assert.calledOnce(callback)
  })

  it('should invoke methods on an object\'s prototype', function () {
    function Foo () {}
    Foo.prototype.a = callback
    var array = [new Foo()]
    invoke(array, 'a')
    sinon.assert.calledOnce(callback)
  })

  it('should return an array of the original length', function () {
    var array = [{ a: callback }, { a: callback }, { a: callback }]
    var result = invoke(array, 'a')
    sinon.assert.calledThrice(callback)
    expect(result).to.be.an('array')
    expect(result).to.have.length(3)
    result.forEach(function (r) {
      expect(r).to.eql({ success: true })
    })
  })

  it('should pass additional parameters to the callback', function () {
    var array = [{ a: callback }]
    invoke(array, 'a', 'b', 'c')
    sinon.assert.calledWithExactly(callback, 'b', 'c')
  })
})

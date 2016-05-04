var describeMethod = require('../describeMethod')

describeMethod('invoke', function (invoke) {
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
    expect(callback.callCount).to.equal(1)
  })

  it('should return an array of the original length', function () {
    var array = [{ a: callback }, { a: callback }, { a: callback }]
    var result = invoke(array, 'a')
    expect(callback.callCount).to.equal(array.length)
    expect(result).to.be.an('array')
    expect(result).to.have.length(array.length)
    for (var i = 0; i < result.length; i++) {
      expect(result[i]).to.eql({ success: true })
    }
  })

  it('should pass additional parameters to the callback', function () {
    var array = [{ a: callback }]
    invoke(array, 'a', 'b', 'c')
    sinon.assert.calledWithExactly(callback, 'b', 'c')
  })
})

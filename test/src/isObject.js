var describeMethod = require('../describeMethod')

describeMethod('isObject', function (isObject) {
  it('should return true if object matches', function () {
    var obj = {'a': 1, 'b': 2}
    expect(isObject(obj)).to.equal(true)
  })

  it('should return true if object is an array', function () {
    var obj = ['obj']
    expect(isObject(obj)).to.equal(true)
  })

  it('should return false if object is a string', function () {
    var obj = 'obj'
    expect(isObject(obj)).to.equal(false)
  })

  it('should return false if given an int', function () {
    var obj = 1
    expect(isObject(obj)).to.equal(false)
  })

  it('should return false if undefined', function () {
    var obj = undefined
    expect(isObject(obj)).to.equal(false)
  })

  it('should return false if null', function () {
    var obj = null
    expect(isObject(obj)).to.equal(false)
  })
})

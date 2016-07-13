var describeMethod = require('../describeMethod')

describeMethod('isArray', function (isArray) {
  it('should return true if argument is an array', function () {
    var obj = ['obj']
    expect(isArray(obj)).to.equal(true)
  })

  it('should return false if argument is an object', function () {
    var obj = {'a': 1, 'b': 2}
    expect(isArray(obj)).to.equal(false)
  })

  it('should return false if argument is a string', function () {
    var obj = 'obj'
    expect(isArray(obj)).to.equal(false)
  })

  it('should return false if given an int', function () {
    var obj = 1
    expect(isArray(obj)).to.equal(false)
  })

  it('should return false if undefined', function () {
    var obj = undefined
    expect(isArray(obj)).to.equal(false)
  })

  it('should return false if null', function () {
    var obj = null
    expect(isArray(obj)).to.equal(false)
  })
})

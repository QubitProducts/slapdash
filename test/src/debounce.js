var describeMethod = require('../describeMethod')

describeMethod('debounce', function (debounce) {
  it('can debounce a function', function (done) {
    var todb = sinon.spy()
    var db = debounce(todb, 1)
    db()
    setTimeout(function () {
      sinon.assert.called(todb)
      done()
    }, 1)
  })

  it('can call immediately', function () {
    var todb = sinon.spy()
    var db = debounce(todb, 1, true)
    db()
    sinon.assert.called(todb)
  })
})

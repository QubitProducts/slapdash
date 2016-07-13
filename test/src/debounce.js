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

  it('will only call once within a window', function () {
    var todb = sinon.spy()
    var db = debounce(todb, 10, true)
    db()
    db()
    sinon.assert.calledOnce(todb)
  })

  it('will resume calls once window is over', function (done) {
    var todb = sinon.spy()
    var time = 2
    var db = debounce(todb, time, true)
    db()
    db()
    setTimeout(function () {
      db()
      setTimeout(function () {
        sinon.assert.calledTwice(todb)
        done()
      }, time)
    }, time)
  })

  it('will preserve context', function (done) {
    var result = null
    var todb = function () {
      result = this
    }
    var db = debounce(todb, 1)
    var context = {
      db: db
    }
    context.db()
    setTimeout(function () {
      expect(result).to.equal(context)
      done()
    }, 1)
  })
})

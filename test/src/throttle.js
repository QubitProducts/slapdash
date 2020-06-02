module.exports = function (throttle) {
  describe('throttle', function () {
    it('can throttle a function', function (done) {
      var tothr = sinon.spy()
      var thr = throttle(tothr, 1)
      thr()
      setTimeout(function () {
        sinon.assert.called(tothr)
        done()
      }, 1)
    })

    it('will only call once within a window', function () {
      var tothr = sinon.spy()
      var thr = throttle(tothr, 90)
      thr()
      setTimeout(function () {
        thr()
      }, 30)
      setTimeout(function () {
        thr()
      }, 60)
      setTimeout(function () {
        thr()
        sinon.assert.calledTwice(tothr)
      }, 150)
    })

    it('will resume calls once window is over', function (done) {
      var tothr = sinon.spy()
      var time = 2
      var thr = throttle(tothr, time)
      thr()
      thr()
      setTimeout(function () {
        thr()
        setTimeout(function () {
          sinon.assert.calledTwice(tothr)
          done()
        }, time)
      }, time)
    })

    it('will preserve context', function (done) {
      var result = null
      var tothr = function () {
        result = this
      }
      var thr = throttle(tothr, 1)
      var context = {
        thr: thr
      }
      context.thr()
      setTimeout(function () {
        expect(result).to.equal(context)
        done()
      }, 1)
    })

    it('will preserve arguments', function (done) {
      var tothr = sinon.spy()
      var thr = throttle(tothr, 1)
      thr('fred')
      setTimeout(function () {
        expect(tothr.withArgs('fred').calledOnce).to.equal(true)
        done()
      }, 1)
    })
  })
}

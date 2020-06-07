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
      var clock = sinon.useFakeTimers(new Date().getTime() )
      var tothr = sinon.spy()
      var throttled = throttle(tothr, 100)

      throttled()
      throttled()
      sinon.assert.notCalled(tothr)

      clock.tick(100)
      sinon.assert.calledOnce(tothr)

      clock.tick(100)

      throttled()
      throttled()
      sinon.assert.calledTwice(tothr)
      clock.restore()
    })

    it('will call immediately if set to call immediately', function () {
      var clock = sinon.useFakeTimers(new Date().getTime())
      var tothr = sinon.spy()
      var throttled = throttle(tothr, 100, true)

      throttled()
      sinon.assert.calledOnce(tothr)

      throttled()
      sinon.assert.calledOnce(tothr)


      clock.tick(100)
      throttled()
      sinon.assert.calledTwice(tothr)

      throttled()
      sinon.assert.calledTwice(tothr)

      clock.tick(100)

      throttled()
      throttled()
      sinon.assert.calledThrice(tothr)
      clock.restore()
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

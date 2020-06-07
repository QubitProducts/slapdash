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

    it('will preserve context', function () {
      var clock = sinon.useFakeTimers(new Date().getTime())
      var tothr = sinon.spy()
      var thr = throttle(tothr, 1, true)
      var spyCall

      thr()
      thr()
      spyCall = tothr.getCall(0)
      expect(spyCall.calledOn(spyCall.thisValue)).to.equal(true)

      clock.tick(100)
      thr()
      thr()
      spyCall = tothr.getCall(1)
      expect(spyCall.calledOn(spyCall.thisValue)).to.equal(true)
      
      clock.restore()
    })

    it('will preserve arguments', function (done) {
      var tothr = sinon.spy()
      var thr = throttle(tothr, 1)
      thr('fred', [1, 2, 3], { name: 'foo', type: 'bar'})
      setTimeout(function () {
        expect(tothr.withArgs('fred', [1, 2, 3], { name: 'foo', type: 'bar'}).calledOnce).to.equal(true)
        done()
      }, 1)
    })

    it('will return values', function () {
      var clock = sinon.useFakeTimers(new Date().getTime())
      var tothr = function(num) { return num * num }
      var thr = throttle(tothr, 1, true)
      var returnValue
      
      returnValue = thr(3)
      expect(returnValue).to.equal(9)

      clock.tick(2)

      returnValue = thr(5)
      expect(returnValue).to.equal(25)

      clock.restore()
    })
  })
}

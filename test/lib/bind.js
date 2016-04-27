// "Borrowed" from https://github.com/QubitProducts/alien-bind
var HAS_NATIVE_BIND = !!Function.prototype.bind

describe('bind', function () {
  var bind, spy

  if (HAS_NATIVE_BIND) {
    bind = require('../../src/bind')
    describe('(where native available)', function () {
      beforeEach(function () {
        spy = sinon.stub(Function.prototype, 'bind')
      })

      afterEach(function () {
        spy.restore()
      })

      it('should not use the native bind function', function () {
        var context = symbol('context')

        bind(introspection, context)()

        sinon.assert.notCalled(spy)
      })
    })
  } else {
    console.warn('No native Function.prototype.bind found - skipping some tests')
    bind = require('../../src/bind')
  }

  it('should bind the first argument as context', function () {
    var context = symbol('context')

    var internals = bind(introspection, context)()

    expect(internals.context).to.equal(context)
    expect(internals.args.length).to.equal(0)
  })

  it('should pass call-time arguments through', function () {
    var context = symbol('context')
    var arg0 = symbol('arg0')
    var boundFn = bind(introspection, context)
    var internals = boundFn(arg0)

    expect(internals.context).to.equal(context)
    expect(internals.args.length).to.equal(1)
    expect(internals.args[0]).to.equal(arg0)
  })

  it('should pass bind-time arguments through', function () {
    var context = symbol('context')
    var arg0 = symbol('arg0')
    var arg1 = symbol('arg1')
    var boundFn = bind(introspection, context, arg0, arg1)
    var internals = boundFn()

    expect(internals.context).to.equal(context)
    expect(internals.args.length).to.equal(2)
    expect(internals.args[0]).to.equal(arg0)
    expect(internals.args[1]).to.equal(arg1)
  })

  it('should concat bind-time and call-time arguments', function () {
    var context = symbol('context')
    var arg0 = symbol('arg0')
    var arg1 = symbol('arg1')
    var arg2 = symbol('arg2')

    var internals = bind(introspection, context, arg0)(arg1, arg2)

    expect(internals.context).to.equal(context)
    expect(internals.args.length).to.equal(3)
    expect(internals.args[0]).to.equal(arg0)
    expect(internals.args[1]).to.equal(arg1)
    expect(internals.args[2]).to.equal(arg2)
  })
})

function introspection () {
  return {
    context: this,
    args: arguments
  }
}

function symbol (name) {
  return {
    id: Math.random(),
    name: name
  }
}

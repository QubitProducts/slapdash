var identity = function (value) { return value }

var suites = {
  'Array.forEach': {
    native: 'forEach',
    slapdash: 'each',
    mdn: 'forEach',
    operands: [[1, 2, 3, 4, 5], identity]
  },
  'Array.map': {
    native: 'map',
    slapdash: 'map',
    mdn: 'map',
    operands: [[1, 2, 3, 4, 5], identity]
  },
  'Array.reduce': {
    native: 'reduce',
    slapdash: 'reduce',
    mdn: 'reduce',
    operands: [[1, 2, 3, 4, 5], identity, 0]
  },
  'Array.find': {
    native: 'find',
    slapdash: 'find',
    mdn: 'find',
    operands: [[1, 2, 3, 4, 5], function (x) { x === 3 }]
  }
}

Object.keys(suites)
  .map(function (suiteName) {
    var suite = suites[suiteName]
    suite.name = suiteName
    return suite
  })
  .forEach(function (spec) {
    suite(spec.name, function () {
      this.spec = spec
      var slapdashMethod = require('../../lib/' + spec.slapdash)
      var mdnMethod = require('./mdn/' + spec.mdn)
      var native = Array.prototype[spec.native]

      benchmark('slapdash.' + spec.slapdash, function () {
        slapdashMethod.apply(null, this.spec.operands)
      })

      native && benchmark('Browser native', function () {
        native.apply(this.list, this.params)
      })

      benchmark('MDN polyfill', function () {
        mdnMethod.apply(this.list, this.params)
      })
    }, {
      onStart: function (event) {
        this.spec = spec
      },
      setup: function () {
        this.list = this.spec.operands[0]
        this.params = this.spec.operands.slice(1)
      },
      teardown: function () {
        this.list = null
        this.params = null
      }
    })
  })

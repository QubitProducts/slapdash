var natives = require('./natives')
var bundle = require('../dist')

// TODO: Find a way to remove this hard-coding so browserify still works
var sources = {
  assign: require('../src/assign'),
  bind: require('../src/bind'),
  each: require('../src/each'),
  filter: require('../src/filter'),
  find: require('../src/find'),
  get: require('../src/get'),
  identity: require('../src/identity'),
  indexOf: require('../src/indexOf'),
  invoke: require('../src/invoke'),
  isMatch: require('../src/isMatch'),
  keys: require('../src/keys'),
  map: require('../src/map'),
  matches: require('../src/matches'),
  not: require('../src/not'),
  objectEach: require('../src/objectEach'),
  objectMap: require('../src/objectMap'),
  objectReduce: require('../src/objectReduce'),
  pick: require('../src/pick'),
  pluck: require('../src/pluck'),
  reduce: require('../src/reduce'),
  set: require('../src/set'),
  slice: require('../src/slice'),
  unique: require('../src/unique'),
  values: require('../src/values'),
  some: require('../src/some')
}

module.exports = function describeMethod (methodName, testSuite) {
  function runSuite (method) {
    describe('with natives intact', function () {
      testSuite(method)
    })

    describe('with natives overridden', function () {
      beforeEach(natives.override)
      testSuite(method)
      afterEach(natives.restore)
    })
  }

  describe('from source,', function () {
    runSuite(sources[methodName])
  })

  describe('from bundle,', function () {
    runSuite(bundle[methodName])
  })
}

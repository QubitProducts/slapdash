var getNative = require('./util/getNative')
var slice = require('./slice')
var keys = require('./keys')
var each = require('./each')

module.exports = getNative(
  'Object.assign',
  function assignFeatureFill (target) {
    var sources = slice(arguments, 1)

    each(sources, function sourceExtender (source) {
      each(keys(source), function sourceKeyExtender (key) {
        target[key] = source[key]
      })
    })

    return target
  }
)

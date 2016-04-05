var extend = Object.assign
  ? Object.assign.bind(Object)
  : _extend

function _extend (target) {
  var sources = Array.prototype.slice.call(arguments, 1)

  sources.forEach(function (source) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key]
    })
  })

  return target
}

module.exports = extend

module.exports = Object.assign
  ? Object.assign.bind(Object)
  : extend

function extend (target) {
  var sources = Array.prototype.slice.call(arguments, 1)

  sources.forEach(function sourceExtender (source) {
    Object.keys(source).forEach(function sourceKeyExtender (key) {
      target[key] = source[key]
    })
  })

  return target
}

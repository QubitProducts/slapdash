module.exports = function set (object, path, val) {
  if (!object) return object
  if (typeof object !== 'object' && typeof object !== 'function') return object

  var parts = path.split('.')
  var context = object
  var nextKey

  do {
    nextKey = parts.shift()
    if (typeof context[nextKey] !== 'object') context[nextKey] = {}
    if (parts.length) {
      context = context[nextKey]
    } else {
      context[nextKey] = val
    }
  } while (parts.length)

  return object
}

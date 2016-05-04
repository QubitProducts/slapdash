// Checks to see whether a specified method is a browser native
module.exports = function isNative (method) {
  return method && typeof method === 'function' && regexpIsNative.test(toSource(method))
}

var toString = Function.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

// Characters to escape in a regex
var regexpCharacters = /[\\^$.*+?()[\]{}|]/g

// Used to detect native methods
var regexpIsNativeFn = toString.call(hasOwnProperty)
  .replace(regexpCharacters, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
var regexpIsNative = RegExp('^' + regexpIsNativeFn + '$')

// Attempts to coerce a function to a string without using its `toString` method
function toSource (func) {
  if (!func) return ''
  try {
    return toString.call(func)
  } catch (e) {}
  try {
    return (func + '')
  } catch (e) {}
}

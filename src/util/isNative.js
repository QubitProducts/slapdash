// Checks to see whether a specified method is a browser native
module.exports = function isNative (method) {
  var type = typeof method
  var isFunction = type === 'function'
  if (!method || (type !== 'object' && !isFunction)) {
    return false
  }

  var pattern = (isFunction || isHostObject(method))
    ? regexpIsNative
    : regexpIsHostCtor

  return pattern.test(toSource(method))
}

// TODO: Check if safe/featurefill
var toString = Function.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

// Characters to escape in a regex
var regexpCharacters = /[\\^$.*+?()[\]{}|]/g

// Used to detect native methods
var regexpIsNativeFn = toString.call(hasOwnProperty)
  .replace(regexpCharacters, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
var regexpIsNative = RegExp('^' + regexpIsNativeFn + '$')

// Used to detect 'host objects' (safari)
var regexpIsHostCtor = /^\[object .+?Constructor\]$/

// Checks if `value` is a 'host object' in IE8
// Lifted verbatim from lodash 4.11.1
function isHostObject (value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false
  if (value != null && typeof value.toString !== 'function') {
    try {
      result = !!(value + '')
    } catch (e) {}
  }
  return result
}

// Attempts to coerce a function to a string without using its `toString` method
function toSource (func) {
  if (func != null) {
    try {
      return toString.call(func)
    } catch (e) {}
    try {
      return (func + '')
    } catch (e) {}
  }
  return ''
}

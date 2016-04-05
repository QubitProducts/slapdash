module.exports = function makeObjectHandler (method) {
  return function objectHandler (object, callback, thisArg) {
    return method(Object.keys(object), translate(object, callback, thisArg), thisArg)
  }
}

function translate (object, callback, thisArg) {
  return function objectTranslator (key) {
    return callback.call(thisArg, object[key], key, object)
  }
}

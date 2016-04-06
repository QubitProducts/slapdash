module.exports = function makeObjectHandler (method) {
  return function objectHandler (object, callback, context) {
    return method(Object.keys(object), translate(object, callback, context), context)
  }
}

function translate (object, callback, context) {
  return function objectTranslator (key) {
    return callback.call(context, object[key], key, object)
  }
}

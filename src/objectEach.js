var each = require('./each')
var keys = require('./keys')

module.exports = function (object, callback, context) {
  return each(keys(object), function (key) {
    return callback.call(context, object[key], key, object)
  }, context)
}

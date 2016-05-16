var each = require('./each')
module.exports = function pick (object, toPick) {
  var out = {}
  each(toPick, function (key) {
    if (typeof object[key] !== 'undefined') out[key] = object[key]
  })
  return out
}

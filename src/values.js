var isNative = require('./util/isNative')
var values = Object.values
module.exports = isNative(values)
  ? values
  : function values (object) {
    var out = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) out.push(object[key])
    }
    return out
  }

var slice = require('./slice')

// Inspired heavily by https://github.com/QubitProducts/alien-bind
module.exports = function bind (method, context) {
  var args = slice(arguments, 2)

  return function boundFunction () {
    return method.apply(context, args.concat(slice(arguments)))
  }
}

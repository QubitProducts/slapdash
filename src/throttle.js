module.exports = function throttle (func, wait) {
  var context, args, result, timeout, previous
  var later = function () {
    previous = Date.now()
    result = func.apply(context, args)
    timeout = context = args = null
  }
  return function () {
    context = this
    args = arguments
    var now = Date.now()
    if (!previous) previous = now
    var remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      if (timeout) timeout = clearTimeout(timeout)
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout) timeout = setTimeout(later, remaining)
    return result
  }
}

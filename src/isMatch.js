module.exports = function isMatch (obj, spec) {
  for (var i in spec) {
    if (spec.hasOwnProperty(i) && obj[i] !== spec[i]) return false
  }
  return true
}

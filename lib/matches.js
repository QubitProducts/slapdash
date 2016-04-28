module.exports = function matches (match) {
  return function (obj) {
    for (var i in match) {
      if (match.hasOwnProperty(i) && obj[i] !== match[i]) {
        return false
      }
    }
    return true
  }
}

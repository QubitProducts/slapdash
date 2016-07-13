module.exports = function isArray (obj) {
  if (Array.isArray) return Array.isArray(obj)
  return Object.prototype.toString.call(obj) === '[object Array]'
}

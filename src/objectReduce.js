module.exports = function objectReduce (object, callback, initialValue) {
  var output = initialValue
  for (var i in object) {
    if (object.hasOwnProperty(i)) output = callback(output, object[i], i, object)
  }
  return output
}

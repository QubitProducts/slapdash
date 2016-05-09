var glbl = Function('return this')() // eslint-disable-line no-new-func
var nativesCache = {}
var names = [
  'Object.assign',
  'Object.keys',
  'Object.values',

  'Array.prototype.filter',
  'Array.prototype.find',
  'Array.prototype.forEach',
  'Array.prototype.indexOf',
  'Array.prototype.keys',
  'Array.prototype.map',
  'Array.prototype.reduce',
  'Array.prototype.slice'
]

var name
for (var i = 0, l = names.length; i < l; i++) {
  name = names[i]
  nativesCache[name] = tryToGetNative(name)
  if (!nativesCache[name]) {
    console.warn('Could not capture native version of ' + name)
  }
}

module.exports = {
  override: overrideNatives,
  restore: restoreNatives
}

function tryToGetNative (name) {
  var output = glbl
  var parts = name.split(/\./g)
  var length = parts.length
  var i
  for (i = 0; i < length; i++) {
    output = output[parts[i]]
  }
  return output
}

function setNative (name, method) {
  var cursor = glbl
  var parts = name.split(/\./g)
  var length = parts.length
  var i
  for (i = 0; i < length - 1; i++) {
    cursor = cursor[parts[i]]
  }
  cursor[parts[length]] = method
}

function overrideNatives () {
  for (var i = 0, l = names.length; i < l; i++) {
    var name = names[i]
    setNative(name, function overridenNative () {
      throw new Error('Overridden version of ' + name + ' called - slapdash should be featurefilling this!')
    })
  }
}

function restoreNatives () {
  for (var i = 0, l = names.length; i < l; i++) {
    var name = names[i]
    if (nativesCache[name]) {
      setNative(name, nativesCache[name])
    }
  }
}

var natives = require('./lib/natives')
var isNative = require('../src/util/isNative')
var assign
var bind
var debounce
var each
var every
var filter
var find
var get
var identity
var indexOf
var invoke
var isArray
var isObject
var isMatch
var keys
var map
var matches
var not
var objectEach
var objectMap
var objectReduce
var pick
var pluck
var reduce
var set
var slice
var unique
var values
var some

describe('polyfill', function () {
  describe('from src', function () {
    natives.override()
    assign = require('../src/assign')
    bind = require('../src/bind')
    debounce = require('../src/debounce')
    each = require('../src/each')
    every = require('../src/every')
    filter = require('../src/filter')
    find = require('../src/find')
    get = require('../src/get')
    identity = require('../src/identity')
    indexOf = require('../src/indexOf')
    invoke = require('../src/invoke')
    isArray = require('../src/isArray')
    isObject = require('../src/isObject')
    isMatch = require('../src/isMatch')
    keys = require('../src/keys')
    map = require('../src/map')
    matches = require('../src/matches')
    not = require('../src/not')
    objectEach = require('../src/objectEach')
    objectMap = require('../src/objectMap')
    objectReduce = require('../src/objectReduce')
    pick = require('../src/pick')
    pluck = require('../src/pluck')
    reduce = require('../src/reduce')
    set = require('../src/set')
    slice = require('../src/slice')
    unique = require('../src/unique')
    values = require('../src/values')
    some = require('../src/some')
    natives.restore()

    if (isNative(assign)) throw new Error('native assign loaded where polyfill was expected')
    if (isNative(bind)) throw new Error('native bind loaded where polyfill was expected')
    if (isNative(debounce)) throw new Error('native debounce loaded where polyfill was expected')
    if (isNative(each)) throw new Error('native each loaded where polyfill was expected')
    if (isNative(every)) throw new Error('native every loaded where polyfill was expected')
    if (isNative(filter)) throw new Error('native filter loaded where polyfill was expected')
    if (isNative(find)) throw new Error('native find loaded where polyfill was expected')
    if (isNative(get)) throw new Error('native get loaded where polyfill was expected')
    if (isNative(identity)) throw new Error('native identity loaded where polyfill was expected')
    if (isNative(indexOf)) throw new Error('native indexOf loaded where polyfill was expected')
    if (isNative(invoke)) throw new Error('native invoke loaded where polyfill was expected')
    if (isNative(isArray)) throw new Error('native isArray loaded where polyfill was expected')
    if (isNative(isObject)) throw new Error('native isObject loaded where polyfill was expected')
    if (isNative(isMatch)) throw new Error('native isMatch loaded where polyfill was expected')
    if (isNative(keys)) throw new Error('native keys loaded where polyfill was expected')
    if (isNative(map)) throw new Error('native map loaded where polyfill was expected')
    if (isNative(matches)) throw new Error('native matches loaded where polyfill was expected')
    if (isNative(not)) throw new Error('native not loaded where polyfill was expected')
    if (isNative(objectEach)) throw new Error('native objectEach loaded where polyfill was expected')
    if (isNative(objectMap)) throw new Error('native objectMap loaded where polyfill was expected')
    if (isNative(objectReduce)) throw new Error('native objectReduce loaded where polyfill was expected')
    if (isNative(pick)) throw new Error('native pick loaded where polyfill was expected')
    if (isNative(pluck)) throw new Error('native pluck loaded where polyfill was expected')
    if (isNative(reduce)) throw new Error('native reduce loaded where polyfill was expected')
    if (isNative(set)) throw new Error('native set loaded where polyfill was expected')
    if (isNative(slice)) throw new Error('native slice loaded where polyfill was expected')
    if (isNative(unique)) throw new Error('native unique loaded where polyfill was expected')
    if (isNative(values)) throw new Error('native values loaded where polyfill was expected')
    if (isNative(some)) throw new Error('native some loaded where polyfill was expected')

    require('./src/assign')(assign)
    require('./src/bind')(bind)
    require('./src/debounce')(debounce)
    require('./src/each')(each)
    require('./src/every')(every)
    require('./src/filter')(filter)
    require('./src/find')(find)
    require('./src/get')(get)
    require('./src/identity')(identity)
    require('./src/indexOf')(indexOf)
    require('./src/invoke')(invoke)
    require('./src/isArray')(isArray)
    require('./src/isObject')(isObject)
    require('./src/isMatch')(isMatch)
    require('./src/keys')(keys)
    require('./src/map')(map)
    require('./src/matches')(matches)
    require('./src/not')(not)
    require('./src/objectEach')(objectEach)
    require('./src/objectMap')(objectMap)
    require('./src/objectReduce')(objectReduce)
    require('./src/pick')(pick)
    require('./src/pluck')(pluck)
    require('./src/reduce')(reduce)
    require('./src/set')(set)
    require('./src/slice')(slice)
    require('./src/unique')(unique)
    require('./src/values')(values)
    require('./src/some')(some)
  })

  describe('from bundle', function () {
    natives.override()
    assign = require('../dist').assign
    bind = require('../dist').bind
    debounce = require('../dist').debounce
    each = require('../dist').each
    every = require('../dist').every
    filter = require('../dist').filter
    find = require('../dist').find
    get = require('../dist').get
    identity = require('../dist').identity
    indexOf = require('../dist').indexOf
    invoke = require('../dist').invoke
    isArray = require('../dist').isArray
    isObject = require('../dist').isObject
    isMatch = require('../dist').isMatch
    keys = require('../dist').keys
    map = require('../dist').map
    matches = require('../dist').matches
    not = require('../dist').not
    objectEach = require('../dist').objectEach
    objectMap = require('../dist').objectMap
    objectReduce = require('../dist').objectReduce
    pick = require('../dist').pick
    pluck = require('../dist').pluck
    reduce = require('../dist').reduce
    set = require('../dist').set
    slice = require('../dist').slice
    unique = require('../dist').unique
    values = require('../dist').values
    some = require('../dist').some
    natives.restore()

    if (isNative(assign)) throw new Error('native assign loaded where polyfill was expected')
    if (isNative(bind)) throw new Error('native bind loaded where polyfill was expected')
    if (isNative(debounce)) throw new Error('native debounce loaded where polyfill was expected')
    if (isNative(each)) throw new Error('native each loaded where polyfill was expected')
    if (isNative(every)) throw new Error('native every loaded where polyfill was expected')
    if (isNative(filter)) throw new Error('native filter loaded where polyfill was expected')
    if (isNative(find)) throw new Error('native find loaded where polyfill was expected')
    if (isNative(get)) throw new Error('native get loaded where polyfill was expected')
    if (isNative(identity)) throw new Error('native identity loaded where polyfill was expected')
    if (isNative(indexOf)) throw new Error('native indexOf loaded where polyfill was expected')
    if (isNative(invoke)) throw new Error('native invoke loaded where polyfill was expected')
    if (isNative(isArray)) throw new Error('native isArray loaded where polyfill was expected')
    if (isNative(isObject)) throw new Error('native isObject loaded where polyfill was expected')
    if (isNative(isMatch)) throw new Error('native isMatch loaded where polyfill was expected')
    if (isNative(keys)) throw new Error('native keys loaded where polyfill was expected')
    if (isNative(map)) throw new Error('native map loaded where polyfill was expected')
    if (isNative(matches)) throw new Error('native matches loaded where polyfill was expected')
    if (isNative(not)) throw new Error('native not loaded where polyfill was expected')
    if (isNative(objectEach)) throw new Error('native objectEach loaded where polyfill was expected')
    if (isNative(objectMap)) throw new Error('native objectMap loaded where polyfill was expected')
    if (isNative(objectReduce)) throw new Error('native objectReduce loaded where polyfill was expected')
    if (isNative(pick)) throw new Error('native pick loaded where polyfill was expected')
    if (isNative(pluck)) throw new Error('native pluck loaded where polyfill was expected')
    if (isNative(reduce)) throw new Error('native reduce loaded where polyfill was expected')
    if (isNative(set)) throw new Error('native set loaded where polyfill was expected')
    if (isNative(slice)) throw new Error('native slice loaded where polyfill was expected')
    if (isNative(unique)) throw new Error('native unique loaded where polyfill was expected')
    if (isNative(values)) throw new Error('native values loaded where polyfill was expected')
    if (isNative(some)) throw new Error('native some loaded where polyfill was expected')

    require('./src/assign')(assign)
    require('./src/bind')(bind)
    require('./src/debounce')(debounce)
    require('./src/each')(each)
    require('./src/every')(every)
    require('./src/filter')(filter)
    require('./src/find')(find)
    require('./src/get')(get)
    require('./src/identity')(identity)
    require('./src/indexOf')(indexOf)
    require('./src/invoke')(invoke)
    require('./src/isArray')(isArray)
    require('./src/isObject')(isObject)
    require('./src/isMatch')(isMatch)
    require('./src/keys')(keys)
    require('./src/map')(map)
    require('./src/matches')(matches)
    require('./src/not')(not)
    require('./src/objectEach')(objectEach)
    require('./src/objectMap')(objectMap)
    require('./src/objectReduce')(objectReduce)
    require('./src/pick')(pick)
    require('./src/pluck')(pluck)
    require('./src/reduce')(reduce)
    require('./src/set')(set)
    require('./src/slice')(slice)
    require('./src/unique')(unique)
    require('./src/values')(values)
    require('./src/some')(some)
  })
})

var assign
var each
var every
var filter
var find
var indexOf
var isArray
var keys
var map
var reduce
var slice
var some
var values

describe('native', function () {
  describe('from src', function () {
    assign = require('../src/assign')
    each = require('../src/each')
    every = require('../src/every')
    filter = require('../src/filter')
    find = require('../src/find')
    indexOf = require('../src/indexOf')
    isArray = require('../src/isArray')
    keys = require('../src/keys')
    map = require('../src/map')
    reduce = require('../src/reduce')
    slice = require('../src/slice')
    some = require('../src/some')
    values = require('../src/values')

    if (!isNative(assign)) throw new Error('polyfill assign loaded where native was expected')
    if (!isNative(each)) throw new Error('polyfill each loaded where native was expected')
    if (!isNative(every)) throw new Error('polyfill every loaded where native was expected')
    if (!isNative(filter)) throw new Error('polyfill filter loaded where native was expected')
    if (!isNative(find)) throw new Error('polyfill find loaded where native was expected')
    if (!isNative(indexOf)) throw new Error('polyfill indexOf loaded where native was expected')
    if (!isNative(isArray)) throw new Error('polyfill isArray loaded where native was expected')
    if (!isNative(keys)) throw new Error('polyfill keys loaded where native was expected')
    if (!isNative(map)) throw new Error('polyfill map loaded where native was expected')
    if (!isNative(reduce)) throw new Error('polyfill reduce loaded where native was expected')
    if (!isNative(slice)) throw new Error('polyfill slice loaded where native was expected')
    if (!isNative(values)) throw new Error('polyfill values loaded where native was expected')
    if (!isNative(some)) throw new Error('polyfill some loaded where native was expected')

    require('./src/assign')(assign)
    require('./src/each')(each)
    require('./src/every')(every)
    require('./src/filter')(filter)
    require('./src/find')(find)
    require('./src/indexOf')(indexOf)
    require('./src/isArray')(isArray)
    require('./src/keys')(keys)
    require('./src/map')(map)
    require('./src/reduce')(reduce)
    require('./src/slice')(slice)
    require('./src/some')(some)
    require('./src/values')(values)
  })

  describe('from bundle', function () {
    assign = require('../dist').assign
    each = require('../dist').each
    every = require('../dist').every
    filter = require('../dist').filter
    find = require('../dist').find
    indexOf = require('../dist').indexOf
    isArray = require('../dist').isArray
    keys = require('../dist').keys
    map = require('../dist').map
    reduce = require('../dist').reduce
    slice = require('../dist').slice
    values = require('../dist').values
    some = require('../dist').some

    if (!isNative(assign)) throw new Error('polyfill assign loaded where native was expected')
    if (!isNative(each)) throw new Error('polyfill each loaded where native was expected')
    if (!isNative(every)) throw new Error('polyfill every loaded where native was expected')
    if (!isNative(filter)) throw new Error('polyfill filter loaded where native was expected')
    if (!isNative(find)) throw new Error('polyfill find loaded where native was expected')
    if (!isNative(indexOf)) throw new Error('polyfill indexOf loaded where native was expected')
    if (!isNative(isArray)) throw new Error('polyfill isArray loaded where native was expected')
    if (!isNative(keys)) throw new Error('polyfill keys loaded where native was expected')
    if (!isNative(map)) throw new Error('polyfill map loaded where native was expected')
    if (!isNative(reduce)) throw new Error('polyfill reduce loaded where native was expected')
    if (!isNative(slice)) throw new Error('polyfill slice loaded where native was expected')
    if (!isNative(values)) throw new Error('polyfill values loaded where native was expected')
    if (!isNative(some)) throw new Error('polyfill some loaded where native was expected')

    require('./src/assign')(assign)
    require('./src/each')(each)
    require('./src/every')(every)
    require('./src/filter')(filter)
    require('./src/find')(find)
    require('./src/indexOf')(indexOf)
    require('./src/isArray')(isArray)
    require('./src/keys')(keys)
    require('./src/map')(map)
    require('./src/reduce')(reduce)
    require('./src/slice')(slice)
    require('./src/values')(values)
    require('./src/some')(some)
  })
})

function isNative (fn) {
  return require('../src/util/isNative')(fn) ||
    (/^\s*function\s*native[A-Z]/).test(fn.toString())
}

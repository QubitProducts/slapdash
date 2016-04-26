# Slapdash

## What?

[![Codeship Status for qubitdigital/slapdash](https://codeship.com/projects/3775dd10-dd64-0133-6ef5-6a9399c471b8/status?branch=master)][codeship]

Slapdash is a lightweight JavaScript utility belt, inspired heavily by
[lodash][lodash], with the following goals:

 - Perform as quickly as possible
 - Be as small as possible
 - Be compatible with Internet Explorer 8 and up
 - Allow methods to be required individually
 - Protect from browser native overrides

 [![Slapdash](http://i.imgur.com/bcHchs7.jpg)][slapdash-transformers]

 > Slapdash's prodigious speed allows him to do everything quickly—which he likes, because anything else would require effort.
 >
 > -- [Transformers Wiki][slapdash-transformers]

## Why?

 - IE8/9 are a distant memory for most web developers, but unfortunately for some of us they remain a waking nightmare. Slapdash aims to change this.
 - Underscore is bloated. Lodash is overweight. Slapdash is *svelte*.
 - We don't all have control over our execution environment. Maybe you're writing script for deployment on 3rd party sites - maybe that 3rd party decides to override `Function::bind` with something incompatible? Don't worry. Slapdash has your back.

## How?

 - IE8 is crap by modern standards. I mean, it doesn't even have `Object.keys`!. So, Slapdash [*featurefills*][featurefills] missing native methods without touching any prototypes.
 - By not implementing the full lodash/underscore API, a lot of cruft can be removed. This includes, for example, supporting strings in place of callbacks in `map`/`each`/`filter` etc.
 - Where possible, slapdash uses browser native methods to boost performance. However, the first time it attempts to get a native method, it will make sure that it is the one it expected. If another script has tampered with the prototype (or doesn't provide one at all), we fall back to our own (small, performant) implementation.

# Usage

    npm install slapdash

You can then import the whole thing:

    var _ = require('slapdash')

    // or

    import _ from 'slapdash'

or cherrypick the methods you want:

    var map = require('slapdash/lib/map')

    // or

    import map from 'slapdash/lib/map'

# API Overview

After analyzing the usage of mini_lodash in deliver-lib, we can draw the following conclusions:

 - These methods are used 10 or more times in our codebase.

   - `bind`: Used everywhere, extremely necessary. Shouldn't ever use the native.
   - `extend`: **Shallow** extend! This will use `Object.assign` where available.
   - `each`: Wrapper around [`Array.prototype.forEach`][mdn-Array-forEach].
   - `map`: Wrapper around [`Array.prototype.map`][mdn-Array-map]
   - `findWhere`: Alias of `find`
   - `chain`: Unlikely to implement this, will refactor usage of this where found.
   - `find`: Wrapper around [`Array.prototype.find`][mdn-Array-find] where available
   - `pluck`: This is just `map` with a string callback.

 - These methods are used between 5-10 times:

   - `reduce`: Wrapper around [`Array.prototype.reduce`][mdn-Array-reduce]
   - `invoke`: Basically just `map`
   - `keys`: `Object.keys` man. Come on.
   - `without`: Wrapper around [`Array.prototype.filter`][mdn-Array-filter]
   - `isNumber`: `typeof x === 'number'`
   - `isFunction`: `typeof x === 'function'`

 - The rest are barely used; 4 or fewer times:

   - `isObject`, `sortBy`, `filter`, `has`, `isArray`, `toArray`, `contains`, `times`, `result`, `flatten`, `clone`, `throttle`, `isEmpty`, `compact`, `every`, `isUndefined`, `compose`, `countBy`, `defer`, `wrap`, `max`, `unique`, `template`, `once`, `isString`, `indexOf`, `start`, `size`, `groupBy`, `difference`, `union`, `reject`, `values`, `rest`, `defaults`, `isBoolean`, `omit`, `object`, `shuffle`, `range`, `identity`

## Design Decisions

One of the most problematic aspects of using lodash's common methods (like `map`, `each`, `reduce`, et. al.) is that they will operate on both arrays and objects, and that they accept callbacks in the form of strings and objects, as well as functions. This means that:

 - There are subtleties to the behavior of each method depending on whether the operand is an array or an object, and whether the callback is a function, string or object.
 - Reading another developer's code which uses these methods can be difficult to reason about. Unless the operand in question is declared near to where it is used, it can be difficult to determine what type it actually is.

As such:

 - Slapdash's 'collection' methods will be split into two sets - array and object. Each of lodash's collection methods will be implemented to support arrays only, with an object-specific version provided separately.
 - Callbacks supplied to these methods may **only** be functions. For most common use cases involving a non-function callback, an alternative will be provided.

Based on this, the API will look something like:

## Methods

### `bind(method, thisArg)`

We use this all over the place, but absolutely cannot rely on the browser's native [`Function.prototype.bind`][mdn-Function-bind] method.

### `extend(target, ...sources)`

This is a handy one that we use a lot. Where [`Object.assign`][mdn-Object-assign] is available, this will be used.

#### Notes

 - This will not support the optional `callback` and `thisArg` methods from lodash.

### `each(array, callback, thisArg)`

This is a wrapper around [`Array.prototype.forEach`][mdn-Array-forEach].

#### Notes

 - Returning `false` will **not** halt execution of this loop, unlike lodash.
 - This only supports arrays, not objects. Use `objectEach` instead.
 - Callback must be a function. Objects or strings are not supported.

### `objectEach(object, callback, thisArg)`

This implements the object behavior of lodash's `each` method.

#### Notes

 - Returning `false` will **not** halt execution of this loop, unlike lodash.
 - This only supports objects, not arrays. Use `each` instead.
 - Callback must be a function. Objects or strings are not supported.

### `map(array, callback, thisArg)`

This is a wrapper around [`Array.prototype.map`][mdn-Array-map].

#### Notes

  - This only supports arrays, not objects. Use `objectMap` instead.
  - Callback must be a function. Objects or strings are not supported. For string support, use `pluck`.

### `objectMap(object, callback, thisArg)`

Behaves like `map`, but operates on the values of an object. Returns a new object, with the same keys, but values updated using `callback`.

Lodash's default behavior returns an array of mapped-over values - to get an array back from `objectMap`, use `objectMap.asArray(...)`

#### Notes

  - This only supports objects, not arrays. Use `map` instead.
  - Callback must be a function. Objects or strings are not supported.

### `find(array, callback, thisArg)`

Where available, this will call [`Array.prototype.find`][mdn-Array-find]. Otherwise, this provides its own
implementation.

  - This only supports arrays, not objects. There is no `objectFind`, as it's really not that useful.
  - Callback must be a function. Objects or strings are not supported.

### `pluck(array, key)`

Returns a new array, containing the `key` attribute from each member of `array`.

#### Notes

  - Lodash actually implements this as an alias of `map`. Because I'm not a masochist, slapdash's version is as simple as possible.

### `reduce(array, callback, initialValue)`

This is just a wrapper around [`Array.prototype.reduce`][mdn-Array-reduce].

#### Notes

  - This only supports arrays, not objects. Use `objectReduce` instead.
  - Callback must be a function. Objects or strings are not supported.

### `objectReduce(object, callback, initialValue)`

This implements the object behavior of lodash's `reduce` method.

#### Notes

  - This only supports objects, not arrays. Use `reduce` instead.
  - Callback must be a function. Objects or strings are not supported.

### `invoke(array, methodName)`

Returns a new array, containing the result of calling each member of `array`'s `methodName` method.

#### Notes

  - This only supports arrays, not objects.

### `without(array, exclude)`

Returns the contents of `array`, minus anything in `exclude`.

#### Notes

  - `exclude` may only be a single, flat array. Unlike lodash's version, this does not flatten the arguments list together.
  - If an empty (or falsey) `exclude` parameter is passed, the original `array` will be returned. Bear this in mind if you are mutating the returned array.

### `filter(array, predicate, context)`

Returns a new array containing the items in `array` for which `predicate` returns true. If `context` is supplied, it will be passed to `callback` as `this`.

#### Notes

  - Only supports arrays, not objects. If there's demand for an `objectFilter` method, raise an issue/PR.

### `indexOf(array, item)`

This is basically just a featurefill for IE8, needed for `without`.

[slapdash-transformers]: http://tfwiki.net/wiki/Slap_Dash
[lodash]: http://lodash.com/
[codeship]: https://codeship.com/projects/144381
[es5]: http://caniuse.com/#search=es5
[mdn-Object-assign]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Object/assign
[mdn-Function-bind]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
[mdn-Array-map]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Array/map
[mdn-Array-find]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Array/find
[mdn-Array-filter]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Array/filter
[mdn-Array-reduce]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Array/reduce
[mdn-Array-forEach]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Array/forEach
[featurefills]: https://toddmotto.com/polyfills-suck-use-a-featurefill-instead/

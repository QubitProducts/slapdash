# Slapdash

### What?

[![Codeship Status for Slapdash](https://codeship.com/projects/3775dd10-dd64-0133-6ef5-6a9399c471b8/status?branch=master)][codeship]

Slapdash is a lightweight JavaScript utility belt, inspired heavily by
[lodash][lodash], with the following goals:

 - Perform as quickly as possible
 - Be as small as possible
 - Be compatible with Internet Explorer 8 and up
 - Protect from browser native overrides

[![Slapdash](http://i.imgur.com/bcHchs7.jpg)][slapdash-transformers]

> Slapdash's prodigious speed allows him to do everything quickly—which he likes, because anything else would require effort.
>
> -- [Transformers Wiki][slapdash-transformers]

### Why?

 - IE8/9 are a distant memory for most web developers, but unfortunately for some of us they remain a waking nightmare. Slapdash aims to change this.
 - Underscore is bloated. Lodash is overweight. Slapdash is *svelte*.
 - We don't all have control over our execution environment. Maybe you're writing script for deployment on 3rd party sites - maybe that 3rd party decides to override `Function::bind` with something incompatible? Don't worry. Slapdash has your back.

### How?

 - IE8 is crap by modern standards. I mean, it doesn't even have `Object.keys`!. So, Slapdash [*featurefills*][featurefills] missing native methods without touching any prototypes.
 - By not implementing the full lodash/underscore API, a lot of cruft can be removed. This includes, for example, supporting strings in place of callbacks in `map`/`each`/`filter` etc.
 - Where possible, slapdash uses browser native methods to boost performance. However, the first time it attempts to get a native method, it will make sure that it is the one it expected. If another script has tampered with the prototype (or doesn't provide one at all), we fall back to our own (small, performant) implementation.

## Usage

    npm install slapdash

You can then import the library like this:

    var _ = require('slapdash')

    // or in ES6

    import _ from 'slapdash'


If you find yourself only using a single method, you *can* import it directly from the source. However, **I strongly recommend against this approach**, as most bundling tools (such as webpack/browserify) add additional closures around each file you import, which both add cruft and work for the browser.

    var map = require('slapdash/src/map')

    // or

    import map from 'slapdash/src/map'

## Bundle Size

| Bundle                               | Size (Kb) |
|:-------------------------------------|:----------|
| Normal bundle                        | 6.6       |
| Minified (`uglifyjs -c -m toplevel`) | 3.1       |
| Minified + Gzipped                   | 1.1       |

## Design Decisions

One of the most problematic aspects of using lodash's common methods (like `map`, `each`, `reduce`, et. al.) is that they can operate on *either* arrays or objects, and that they accept callbacks in the form of strings and objects, as well as simply functions. This means that:

 - There are subtleties to the behavior of each method depending on the types of the operands.
 - Reading code which uses these methods can be difficult to reason about. Unless the operand in question is declared near to where it is used (or there is an assertion/invariant to validate the type), it can be difficult to determine what type it actually is.

As such:

 - Slapdash's 'collection' methods are split into two sets - array and object. Each of lodash's collection methods will be implemented to support arrays only, with an object-specific version provided separately.
 - Callbacks supplied to these methods may **only** be functions. For most common use cases involving a non-function callback, an alternative will be provided.

## API Reference

### `bind(method, context, arguments...)`

This returns a wrapper function around `method`, passing `context` as `this`, and optionally passing one or more arguments.This is a featurefill of the [`Function.prototype.bind`][mdn-Function-bind] method.

### `assign(target, ...sources)`

Depending on the browser (and/or bad polyfills), this is either `Object.assign` or an equivalent featurefill.

#### Notes

 - This does not support the optional `callback` and `context` methods from lodash.

### `each(array, callback, context)`

This is a wrapper around [`Array.prototype.forEach`][mdn-Array-forEach].

#### Notes

 - Returning `false` will **not** halt execution of this loop, unlike lodash.
 - This only supports arrays, not objects. Use `objectEach` instead.
 - Callback must be a function. Objects or strings are not supported.

### `objectEach(object, callback, context)`

Iterates over the properties of `object`, calling `callback` on each. This is similar to passing an object to lodash's `each` method.

#### Notes

 - Returning `false` will **not** halt execution of this loop, unlike lodash.
 - This only supports objects, not arrays. Use `each` instead.
 - Callback must be a function. Objects or strings are not supported.

### `map(array, callback, context)`

This is a wrapper around [`Array.prototype.map`][mdn-Array-map].

#### Notes

  - This only supports arrays, not objects. Use `objectMap` instead.
  - Callback must be a function. Objects or strings are not supported. For string support, use `pluck`.

### `objectMap(object, callback, context)`

Behaves like `map`, but operates on the values of an object. Returns a new object, with the same keys, but with the values passed through `callback`.

Lodash's default behavior returns an array of mapped-over values - to get an array back from `objectMap`, use `objectMap.asArray(...)`

#### Notes

  - This only supports objects, not arrays. Use `map` instead.
  - Callback must be a function. Objects or strings are not supported.

### `find(array, callback, context)`

Where available, this will call [`Array.prototype.find`][mdn-Array-find]. Otherwise, this provides its own implementation.

  - This only supports arrays, not objects. There is no `objectFind`, as it's really not that useful.
  - Callback must be a function. Objects or strings are not supported.

### `pluck(array, key)`

Returns a new array, containing the `key` attribute from each member of `array`.

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

### `filter(array, predicate, context)`

Returns a new array containing the items in `array` for which `predicate` returns true. If `context` is supplied, it will be passed to `callback` as `this`.

#### Notes

  - Only supports arrays, not objects. If there's demand for an `objectFilter` method, raise an issue/PR.

### `indexOf(array, item)`

This is a wrapper around [`Array.prototype.indexOf`](mdn-Array-indexOf).

### `isMatch(object, matchAgainst)`

Returns true if and only if every property of the object `matchAgainst` exists in `object` and is strictly equivalent (`===`).

### `matches(matchAgainst)`

Returns a function which accepts an object as a parameter, and returns true if every property of the object `matchAgainst` exists in `object` and is strictly equivalent (`===`).

This can be handy in replicating `_.findWhere`, which slapdash doesn't implement. For example:

```js
var joe = _.find(users, _.matches({ id: 4567 }))
```

### `identity(value)`

Returns `value`. Useless by itself, but useful as a callback to `filter`, `find` and others.

### `not(value)`

Returns `true` if `value` is falsey, otherwise returns `false`. Useful as a callback to `find`.

### `get(object, path)`

Given a path such as `'x.y.z'`, this will return `object.x.y.z`. Array elements can also be accessed, by treating the array index like an object key, e.g. `get(object, 'a.b.c.3')`.

### `set(object, path, value)`

Given a path such as `'x.y.z'`, this will set `object.x.y.z = value`. Like `get`, this also supports array indices.

### `unique(array)`

Returns a copy of `array`, without duplicate values (using strict equivalence, i.e. `===`).

### `pick(object, keys)`

Returns a copy of `object` with only the keys that exist in `keys`.

## If you were looking for...

### `findWhere(array, object)`

You can use `matches` to create a callback for `find`:

```js
_.find(array, _.matches(object))
```

### `some(array, callback, context)`

You can closely replicate the behavior of `some` using `find`:

```js
!!_.find(array, callback, context)
```

**N.B.** If your array contains falsey values, and your callback returns `true` for those values, `find` will return the *falsey value itself* where `some` would have returned `true`. As far as we're aware, checking for falsey values in this way is an uncommon usage pattern - if you need to do this, you can use the following workaround:

```js
!!_.find(_.map(array, callback, context), _.identity)
```

### `every(array, callback, context)`

Again, this is just `find`, although you must change `callback` to negate its return value.

```js
!_.find(array, negatedCallback, context)
```

**N.B.** As with `some`, you must remember that `find` will return the value for which `callback` first returns `true`. Therefore, if you have falsey values in your array, for which your callback returns `true`, `find` will return that falsey value instead of the result of the callback, giving you a false positive for `every`. Again, this is an uncommon usage pattern - if you need this, then use the following workaround:

```js
!_.find(_.map(array, callback, context), _.not)
```

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
[mdn-Array-indexOf]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Array/indexOf
[featurefills]: https://toddmotto.com/polyfills-suck-use-a-featurefill-instead/

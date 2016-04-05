# Slapdash

[![Slapdash](http://i.imgur.com/bcHchs7.jpg)][slapdash-transformers]

> Slapdash's prodigious speed allows him to do everything quickly—which he likes, because anything else would require effort.
>
> -- [Transformers Wiki][slapdash-transformers]

## What?

Slapdash is a lightweight utility JavaScript utility belt, inspired heavily by
lodash, with the following desirable features:

 - Perform as quickly as possible
 - Be as small as possible
 - Be compatible with Internet Explorer 9 and up (ES5, essentially)
 - Allow methods to be required individually

## Why?

 - Nobody cares about IE8 any more. Nobody wants to care about IE9 either, but unfortunately some people are still using it.
 - Even with a custom build, lodash 2 is a monolithic JS bundle - it's better if we can require individual methods from it to keep our bundles smaller.

## Facts & Figures

 - When bundled using `webpack -p`, the output filesize is a tiny **2.3kb** (**725 bytes** when gzipped)!

# API Overview

After analyzing the usage of mini_lodash in deliver-lib, we can draw the following conclusions:

 - These methods are used 10 or more times in our codebase.

   - `bind`: this will be provided by `alien-bind`, because polyfills.
   - `extend`: **Shallow** extend! This will use `Object.assign` where available.
   - `each`: Wrapper around `Array::forEach`.
   - `map`: Wrapper around `Array::map`
   - `findWhere`: Alias of `find`
   - `chain`: Unlikely to implement this, will refactor usage of this where found.
   - `find`: Wrapper around `Array::find` where available
   - `pluck`: This is just `map` with a string callback.

 - These methods are used between 5-10 times:

   - `reduce`: Wrapper around `Array::reduce`
   - `invoke`: Basically just `map`
   - `keys`: `Object.keys` man. Come on.
   - `without`: Wrapper around `Array::filter`
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

## API Definition

### `bind(method, thisArg)`

We use this all over the place, but absolutely cannot rely on the browser's native `Function::bind` method. This will use `alien-bind` under the bonnet.

### `extend(target, ...sources)`

This is a handy one that we use a lot. Where `Object.assign` is available, this will be used.

#### Notes

 - This will not support the optional `callback` and `thisArg` methods from lodash.

### `each(array, callback, thisArg)`

This is a wrapper around `Array::forEach`.

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

This is a wrapper around `Array::map`.

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

Where available, this will call `Array::find`. Otherwise, this provides its own
implementation.

  - This only supports arrays, not objects. Use `objectFind` instead.
  - Callback must be a function. Objects or strings are not supported.

### `objectFind(object, callback, thisArg)`

This implements the object behavior of lodash's `find` method.

#### Notes

  - This only supports objects, not arrays. Use `find` instead.
  - Callback must be a function. Objects or strings are not supported.

### `pluck(array, key)`

Returns a new array, containing the `key` attribute from each member of `array`.

#### Notes

  - Lodash actually implements this as an alias of `map`. Because I'm not a masochist, slapdash's version is as simple as possible.

### `reduce(array, callback, initialValue)`

This is just a wrapper around `Array::reduce`.

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

[slapdash-transformers]: http://tfwiki.net/wiki/Slap_Dash
[lodash]: http://lodash.com/

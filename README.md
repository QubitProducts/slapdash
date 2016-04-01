# Slapdash

[![Slapdash](http://i.imgur.com/bcHchs7.jpg)][slapdash-transformers]

> Slapdash's prodigious speed allows him to do everything quickly—which he likes, because anything else would require effort.
>
> -- [Transformers Wiki][slapdash-transformers]

## What?

Slapdash is a lightweight subset of [lodash][lodash]. It's designed to:

 - Perform as quickly as possible
 - Be compatible with Internet Explorer 9
 - Allow methods to be required individually
 - Protect itself from bad overriding of native browser methods

## Why?

 - Nobody cares about IE8 any more. Nobody wants to care about IE9 either, but unfortunately some people are still using it.
 - Even with a custom build, lodash 2 is a monolithic JS bundle - it's better if we can require individual methods from it to keep our bundles smaller.
 - Browsers provide us with high-performance native methods via prototypes, but some libraries/websites insist on polyfilling them with incompatible alternatives.

## How?

 - Leveraging native methods without destroying any overrides.

[slapdash-transformers]: http://tfwiki.net/wiki/Slap_Dash
[lodash]: http://lodash.com/

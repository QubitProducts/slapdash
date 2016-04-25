// This file used to use require.context, provided by Webpack.
// However, Webpack depends on ES5, which I would normally shim,
// but half of the point of this library is sidestepping shims.

// So, I am using browserify instead, and this incredibly foolproof method for
// running tests:
require('./lib/bind')
require('./lib/each')
require('./lib/extend')
require('./lib/filter')
require('./lib/find')
require('./lib/invoke')
require('./lib/keys')
require('./lib/map')
require('./lib/objectEach')
require('./lib/objectMap')
require('./lib/objectReduce')
require('./lib/pluck')
require('./lib/reduce')
require('./lib/slice')
require('./lib/without')

require('./lib/index')

require('./lib/util/isNative')
require('./lib/util/getNAtive')

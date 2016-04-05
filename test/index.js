var testsContext = require.context('./lib', true, /\.js$/)
testsContext.keys().forEach(testsContext)

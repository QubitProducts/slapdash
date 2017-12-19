module.exports = function (config) {
  var customLaunchers = {
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10.0'
    }
  }

  config.set({
    frameworks: ['browserify', 'mocha', 'expect', 'sinon'],

    files: ['test/**/*.js'],

    // add webpack as preprocessor
    preprocessors: {
      'test/**/*.js': ['browserify', 'sourcemap']
    },

    webpack: {
      // karma watches test/test_index.js
      // webpack watches dependencies of test/test_index.js
      watch: true,
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js']
      }
    },

    webpackServer: {
      quiet: true,
      noInfo: true
    },

    mocha: {
      timeout: 20000
    },

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,

    customLaunchers: customLaunchers,
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ]
  })
}

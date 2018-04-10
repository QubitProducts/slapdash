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

    files: [ process.env.SLAPDASH_FILES ],

    preprocessors: {
      'test/**/*.js': ['browserify', 'sourcemap']
    },

    mocha: {
      timeout: 20000
    },

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,

    customLaunchers: customLaunchers,

    browserify: {
      debug: true
    },

    browsers: process.env.SAUCY
      ? ['sl_ie_8', 'sl_ie_9', 'sl_ie_10']
      : ['Chrome'],

    reporters: process.env.SAUCY
      ? ['dots', 'saucelabs']
      : ['mocha']
  })
}

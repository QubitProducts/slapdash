module.exports = function (config) {
  var customLaunchers = {
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iPhone 4S',
      platform: 'OS X 10.10',
      version: '8.0'
    },
    sl_android_40: {
      base: 'SauceLabs',
      browserName: 'Android Emulator',
      patform: 'Linux',
      version: '4.0'
    },
    sl_ie_8: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows XP',
      version: '8.0'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 7',
      version: '9.0'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
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

    customLaunchers: customLaunchers,
    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ]
  })
}

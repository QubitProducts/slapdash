var path = require('path')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    files: ['test/index.js'],

    // add webpack as preprocessor
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
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

    browsers: ['Chrome', 'Firefox']
  })
}

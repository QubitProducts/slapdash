module.exports = function (config) {
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

    browsers: ['Chrome', 'Firefox', 'PhantomJS']
  })
}

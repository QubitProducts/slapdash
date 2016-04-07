module.exports = function (config) {
  config.set({
    frameworks: ['benchmark', 'mocha'],
    reporters: ['benchmark'],

    files: [
      'test/benchmark/suites.js'
    ],

    preprocessors: {
      'test/benchmark/suites.js': ['webpack', 'sourcemap']
    },

    webpack: {
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

    browsers: [
      'Chrome',
      'Firefox',
      'PhantomJS'
    ]
  })
}

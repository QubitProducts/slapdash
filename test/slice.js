var slice = require('../src/slice')

describe('slice', function () {
  var baseArray = [1, 2, 3, 4, 5]
  var testCases = {
    'with no operands': {
      operands: [],
      tests: {
        'should shallow equal the input': baseArray,
        'should clone the input': function (output, input) {
          expect(output).not.to.equal(input)
        }
      }
    },
    'with 0 as start operand': {
      operands: [0],
      tests: {
        'should shallow equal the input': baseArray,
        'should clone the input': function (output, input) {
          expect(output).not.to.equal(input)
        }
      }
    },
    'with positive start operand': {
      operands: [2],
      tests: {
        'should return the near end of the array': [3, 4, 5]
      }
    },
    'with negative start operand': {
      operands: [-2],
      tests: {
        'should return the far end of the array': [4, 5]
      }
    },

    'with 0 as start and end operands': {
      operands: [0, 0],
      tests: {
        'should give back an empty array': []
      }
    },
    'with positive start and end operands': {
      operands: [2, 2],
      tests: {
        'should give back an empty array': []
      }
    },
    'with negative start and end operands': {
      operands: [-2, -1],
      tests: {
        'should return the middle of the array': [4]
      }
    },
    'with positive start and negative end': {
      operands: [1, -2],
      tests: {
        'should return the middle of the array': [2, 3]
      }
    },
    'with negative start and positive end': {
      operands: [-4, 4],
      tests: {
        'should return the end of the array': [2, 3, 4]
      }
    }
  }

  for (var i in testCases) {
    var suite = testCases[i]
    describe(i, function () {
      for (var j in suite.tests) {
        it(j, (function (suite, j) {
          var test = suite.tests[j]
          return function () {
            var actual = slice.apply(null, [baseArray].concat(suite.operands))
            if (typeof test === 'function') {
              test(actual, suite.operands)
            } else {
              expect(actual).to.eql(test)
            }
          }
        }(suite, j)))
      }
    })
  }
})

var shuffle = require('../')
  , assert = require('assert')

function args() {
  return Array.prototype.slice.call(arguments)
};

var shuffled = shuffle(args);

suite('shuffler', function() {
  test('Should re-order arguments by index', function() {
    [[3, 2, 1, 0]
    ,[0, 1, 2, 3]
    ,[2, 3, 0, 1]
    ,[1, 1, 1, 1]
    ,[2, 3, 2, 1]
    ].forEach(function(arr) {
      assert.deepEqual(shuffled.apply(null, arr)(0, 1, 2, 3), arr)
    })
  })
  test('Falsey, non-numerical arguments will always be null', function() {
    assert.deepEqual(shuffled(3, false, false, 0)(0, 1, 2, 3), [3, null, null, 0])
  })
  test('Truthy, non-numerical arguments will remain unaltered', function() {
    assert.deepEqual(shuffled(3, true, true, 0)(0, 1, 2, 3), [3, 1, 2, 0])
  })
  suite('options', function() {
    suite('.carryon', function() {
      test('When true, include additional arguments', function() {
        assert.deepEqual(shuffle(args, {
          carryon: true
        })(3, false)(0, 1, 2, 3), [3, null, 2, 3])
      })
      test('When false, cut off any additional arguments', function() {
        assert.deepEqual(shuffle(args, {
          carryon: false
        })(3, false)(0, 1, 2, 3), [3, null])
      })
    })
  })
})
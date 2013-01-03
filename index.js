function shuffle(fn, opts) {
  var opts = opts || {}
    , carryon = typeof opts.carryon === 'undefined' ? true : opts.carryon

  return function shuffler() {
    var size = arguments.length
      , order = Array.prototype.slice.call(arguments)

    order = order.map(function(n) {
      var shuffled = typeof n === 'number'
        , muted = !shuffled && !n

      return {
          value: n
        , muted: muted
        , shuffled: shuffled
      }
    })

    return function shuffled() {
      var args = arguments
        , updated = []
        , l = Math.max(arguments.length, size)
        , i = 0

      // This might look unwieldy, but it's about five times
      // faster than using .map and .concat :)
      for (; i < l; i += 1) {
        if (!order[i]) {
          if (!carryon) break
          updated[i] = args[i]
        } else
        if (order[i].shuffled) {
          updated[i] = args[order[i].value]
        } else
        if (order[i].muted) {
          updated[i] = null
        } else {
          updated[i] = args[i]
        }
      }

      return fn.apply(this, updated);
    };
  };
};

module.exports = shuffle

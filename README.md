# shuffler #

`shuffler` lets you swap around the order of a function's arguments by index.

## Installation ##

Using [NPM](http://npmjs.org/):

``` bash
$ npm install shuffler
```

Or as a [component](http://github.com/component/component):

``` bash
$ component install hughsk/shuffler
```

## Usage ##

`shuffler` takes a function as its first argument and returns a second function to determine the new argument order. Take this example:

``` javascript
var shuffle = require('shuffler')

function args() {
  console.log(Array.prototype.slice.call(arguments))
};

args('a', 'b', 'c', 'd') // ['a', 'b', 'c', 'd']

args = shuffle(args)(3, 2, 1, 0)
args('a', 'b', 'c', 'd') // ['d', 'c', 'b', 'a']
```

You can pass a falsey non-numerical value to mute it, i.e. that argument will always be `null`:

``` javascript
args('a', 'b', 'c', 'd') // ['a', 'b', 'c', 'd']

args = shuffle(args)(3, 2, false, 0)
args('a', 'b', 'c', 'd') // ['d', 'c', null, 'a']
```

Or a truthy non-numerical value to just use the default argument:

``` javascript
args('a', 'b', 'c', 'd') // ['a', 'b', 'c', 'd']

args = shuffle(args)(3, 2, true, 3)
args('a', 'b', 'c', 'd') // ['d', 'c', 'c', 'd']
```

By default, any extra arguments will still be used. You can disable this by
passing the `carryon` option as false.

``` javascript
args('a', 'b', 'c', 'd') // ['a', 'b', 'c', 'd']

args = shuffle(args)(1, 1)
args('a', 'b', 'c', 'd') // ['b', 'b', 'c', 'd']

args = shuffle(args, {
  carryon: false
})(1, 1)
args('a', 'b', 'c', 'd') // ['b', 'b']
```

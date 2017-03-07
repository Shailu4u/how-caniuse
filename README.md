# how-caniuse

Query the caniuse-db to check browsers compatibilities.

## Installation

```console
$ npm install how-caniuse --save
```

## Usage

```js
const howcaniuse = require('how-caniuse');

howcaniuse.getCompleteDataset('border-image')
howcaniuse.getSupport('border-image')
howcaniuse.isSupported('border-image', 'ie 8, chrome 52')
howcaniuse.searchFeature('css3')
howcaniuse.getLatestStableBrowsers()
howcaniuse.getBrowserScope
```

## API

#### `howcaniuse.getSupport(feature)`

_Find since which browsers versions a feature is available_

* `y` - (**Y**)es, supported by default
* `a` - (**A**)lmost supported (aka Partial support)
* `n` - (**N**)o support, or disabled by default
* `p` - No support, but has (**P**)olyfill
* `u` - Support (**u**)nknown
* `x` - Requires prefi(**x**) to work
* `d` - (**D**)isabled by default (need to enable flag or something in browser settings)

```js
howcaniuse.getSupport('css-grid')
/*
    {
    "title":"CSS Grid Layout",
    "browsers":
    {
        "ie":{"n":8,"a":11,"x":11,"p":9},
        "edge":{"a":15,"x":15},
        "firefox":{"y":52,"n":18,"p":51,"d":51},
        "chrome":{"y":57,"n":24,"p":56,"d":56},
        "safari":{"y":"TP","n":5.1,"p":10},
        "opera":{"y":44,"n":27,"p":43,"d":43},
        "ios_saf":{"n":5.1,"p":10.2},
        "op_mini":{"n":"all"},
        "android":{"n":4.1,"p":53},
        "bb":{"n":10},
        "op_mob":{"n":12.1,"p":37},
        "and_chr":{"p":56},
        "and_ff":{"p":51},
        "ie_mob":{"a":11,"x":11},
        "and_uc":{"n":11},
        "samsung":{"p":4},
        "and_qq":{"p":1.2,"d":1.2}
        }
   }
*/
```

#### `howcaniuse.isSupported(feature, browsers)`

_Find if a feature is supported by some browsers_

```js
howcaniuse.isSupported('border-image', 'ie 8, ie 9, edge 14, chrome 58, firefox 50')
/*
{ 'border-image':
   { 'ie 8': 'n',
     'ie 9': 'n',
     'edge 14': 'y',
     'chrome 58': 'a',
     'firefox 50': 'y' } }
*/
```

#### `howcaniuse.searchFeature(feature)`

_Search for a caniuse feature name and it returns list of all available features_

Ex:

```js
howcaniuse.searchFeature('border') // [ 'border-image', 'border-radius' ]
howcaniuse.searchFeature('xyz') // [] returns an empty array if there are no results
howcaniuse.searchFeature('font')
/*
[ 'fontface',
  'font-feature',
  'svg-fonts',
  'font-loading',
  'font-unicode-range',
  'css-font-stretch',
  'font-size-adjust',
  'font-smooth',
  'font-kerning',
  'font-variant-alternates',
  'css-font-rendering-controls' ]
*/
```

#### `howcaniuse.getLatestStableBrowsers()`

_Get the list of all stable browsers_

```js
howcaniuse.getLatestStableBrowsers()
/*
  [ { browser: 'IE', type: 'desktop', stableVersion: '11' },
  { browser: 'Edge', type: 'desktop', stableVersion: '15' },
  { browser: 'Firefox', type: 'desktop', stableVersion: '54' },
  { browser: 'Chrome', type: 'desktop', stableVersion: '59' },
  { browser: 'Safari', type: 'desktop', stableVersion: 'TP' },
  { browser: 'Opera', type: 'desktop', stableVersion: '45' },
  { browser: 'iOS Safari', type: 'mobile', stableVersion: '10.0-10.2' },
  { browser: 'Opera Mini', type: 'mobile', stableVersion: 'all' },
  { browser: 'Android Browser', type: 'mobile', stableVersion: '53' },
  { browser: 'Blackberry Browser', type: 'mobile', stableVersion: '10' },
  { browser: 'Opera Mobile', type: 'mobile', stableVersion: '37' },
  { browser: 'Chrome for Android', type: 'mobile', stableVersion: '56' },
  { browser: 'Firefox for Android', type: 'mobile', stableVersion: '51' },
  { browser: 'IE Mobile', type: 'mobile', stableVersion: '11' },
  { browser: 'UC Browser for Android', type: 'mobile', stableVersion: '11' },
  { browser: 'Samsung Internet', type: 'mobile', stableVersion: '4' },
  { browser: 'QQ Browser', type: 'mobile', stableVersion: '1.2' } ]
*/
```

#### `howcaniuse.getBrowserScope()`

_Returns a list of  all browsers available out there_

```js
howcaniuse.getBrowserScope()
/*
[ { browser: 'IE',
    prefix: 'ms',
    type: 'desktop',
    versions: [ '5.5', '6', '7', '8', '9', '10', '11' ] },
  { browser: 'Edge',
    prefix: 'ms',
    type: 'desktop',
    versions: [ '12', '13', '14', '15' ] },
  ....
*/
```


---

## [License](LICENSE)

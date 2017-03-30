# tape-async

[![Greenkeeper badge](https://badges.greenkeeper.io/parro-it/tape-async.svg)](https://greenkeeper.io/)

> A lite wrapper around [tape](https://github.com/substack/tape) to simplify async testing.

[![Travis Build Status](https://img.shields.io/travis/parro-it/tape-async.svg)](http://travis-ci.org/parro-it/tape-async)
[![NPM module](https://img.shields.io/npm/v/tape-async.svg)](https://npmjs.org/package/tape-async)
[![NPM downloads](https://img.shields.io/npm/dt/tape-async.svg)](https://npmjs.org/package/tape-async)

# Installation

```bash
npm install -D tape-async
```

# Usage

## Use with `async-await`

```js
  const test = require('tape-async');
  const sleep = require('sleep-promise');

  test('this test will successfully pass', async (t) => {
    await sleep(100);
    const a = await Promise.resolve(42);
    t.equal(a, 42);
  });
```

`tape-async` supports future ES async-await syntax.
You are in charge to provide traspilation of your test code.

## Use with `generators`

```js
  const test = require('tape-async');
  const sleep = require('sleep-promise');

  test('this test will successfully pass', function *(t) {
    const result = yield Promise.resolve(42);
    t.equal(result, 42);
  });
```

`tape-async` supports generators test to handle async code.
They run using [co](https://github.com/tj/co).


## It catch unhandled errors

```js
  const test = require('tape-async');
  test('this test will fail', () => {
    setTimeout(()=>{
      throw new Error('unhandled');
    }, 100);
  });
```

Unhandled errors in your tests are automatically covered.
Test suite fails with a generic error message and a stack trace.


## It catch unhandled `Promise` rejections

```js
  const test = require('tape-async');
  test('this test will fail', () => {
    Promise.reject(new Error('unhandled'));
  });
```

Uncatched Promise rejection in your tests are automatically covered.
Test suite fails with a generic error message and a stack trace.


## It support every [tape](https://github.com/substack/tape) features.

```js
  const test = require('tape-async');
  test.skip('this test will be skipped', () => {

  });

  test.only('this test will be the only one', t => {
    t.equal(42, 42);
    t.end();
  });
```

Since this is only a tiny wrapper around `tape`, you can
use every feature you are used to.


# Related projects

* [tape](https://github.com/substack/tape) - tap-producing test harness for node and browsers.

# License
The MIT License (MIT)

Copyright (c) 2016 Andrea Parodi




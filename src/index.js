'use strict';

const test = require('tape');
const co = require('co');

function asyncTest(descr, cb) {
  test(descr, t => {
    const wrappedCb = co.wrap(cb);
    wrappedCb(t)
      .then( () => t.end())
      .catch(err => {
        t.end(err);
      });
  });
}

function syncTest(descr, cb) {
  test(descr, t => {
    try {
      cb(t);
      t.end();
    } catch (err) {
      t.end(err);
    }
  });
}

asyncTest.syncTest = syncTest;
module.exports = asyncTest;

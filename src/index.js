'use strict';

const test = require('tape');
const co = require('co');

module.exports = (descr, cb) => {
  test(descr, t => {
    const wrappedCb = co.wrap(cb);
    wrappedCb(t)
      .then( () => t.end())
      .catch(err => {
        t.end(err);
      });
  });
};

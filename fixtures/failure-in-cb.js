'use strict';
const test = require('..');

test('this test will fail', t => {
  t.deferred();
  setTimeout(()=>{
    t.equal(true, false);
    t.end();
  }, 2);
});

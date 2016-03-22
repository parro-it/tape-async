'use strict';
const test = require('..');

test('this test will fail', t => {
  setTimeout(()=>{
    t.equal(true, false);
    t.end();
  }, 2000);
});

'use strict';
const test = require('..');

test('this test will fail', () => {
  setTimeout(()=>{
    throw new Error('unhandled');
  }, 100);
});

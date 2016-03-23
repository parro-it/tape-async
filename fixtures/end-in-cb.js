'use strict';
const test = require('..');

test('first test', t => {
  t.deferred();
  process.stdout.write('first test start\n');
  setTimeout(()=>{
    t.equal(true, true);
    t.end();
    process.stdout.write('first test end\n');
  }, 2);
});

test('second test', t => {
  t.deferred();
  process.stdout.write('second test start\n');
  setTimeout(()=>{
    t.equal(true, true);
    t.end();
    process.stdout.write('second test end\n');
  }, 2);
});

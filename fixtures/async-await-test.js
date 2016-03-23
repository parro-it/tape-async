'use strict';

const test = require('..');
const sleep = require('sleep-promise');

test('this test will successfully pass', async (t) => {
  await sleep(10);
  const a = await Promise.resolve(42);
  t.equal(a, 42);
});

test('also this test will successfully pass', async (t) => {
  await sleep(10);
  const a = await Promise.resolve(43);
  t.equal(a, 43);
});

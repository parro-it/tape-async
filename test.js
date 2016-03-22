'use strict';
const test = require('.');
const execa = require('execa');


test('support async await functions', function *(t) {
  const result = yield execa('babel-node', ['fixtures/async-await-test']);
  t.equal(result.stdout.split('\n')[2], 'ok 1 should be equal');
});


test('support normal cb termination', function *(t) {
  try {
    yield execa('node', ['fixtures/failing-test']);
    t.fail('Failure expected');
  } catch (err) {
    t.equal(err.stdout.split('\n')[2], 'not ok 1 should be equal');
  }
});


test('log unhandled exceptions', function *(t) {
  try {
    yield execa('node', ['fixtures/unhandled-exception-test']);
    t.fail('Failure expected');
  } catch (err) {
    t.equal(err.stderr.slice(0, 30), '\nUnhandled exception occurred.');
  }
});

test('log unhandled rejection', function *(t) {
  try {
    yield execa('node', ['fixtures/unhandled-rejection-test']);
    t.fail('Failure expected');
  } catch (err) {
    t.equal(err.stderr.slice(0, 30), '\nUnhandled rejection occurred.');
  }
});

test('log unexpected rejections', function *(t) {
  try {
    yield execa('node', ['fixtures/unexpected-rejection-test']);
    t.fail('Failure expected');
  } catch (err) {
    t.equal(err.stdout.split('\n')[2], 'not ok 1 Error: unexpected');
  }
});

test('log unexpected exceptions', function *(t) {
  try {
    yield execa('node', ['fixtures/unexpected-exception-test']);
    t.fail('Failure expected');
  } catch (err) {
    t.equal(err.stdout.split('\n')[2], 'not ok 1 Error: unexpected');
  }
});

test('log test failures', function *(t) {
  try {
    yield execa('node', ['fixtures/failing-test']);
    t.fail('Failure expected');
  } catch (err) {
    t.equal(err.stdout.split('\n')[2], 'not ok 1 should be equal');
  }
});

test('support generators with plan', function *(t) {
  t.plan(1);
  const result = yield Promise.resolve(42);
  t.equal(result, 42);
});

test('support sync function with plan', function(t) {
  t.plan(1);
  const result = 42;
  t.equal(result, 42);
});

test('support arrows with plan', t => {
  t.plan(1);
  const result = 42;
  t.equal(result, 42);
});

test('support generators', function *(t) {
  const result = yield Promise.resolve(42);
  t.equal(result, 42);
});

test('support sync function', function(t) {
  const result = 42;
  t.equal(result, 42);
});

test('support arrows', t => {
  const result = 42;
  t.equal(result, 42);
});


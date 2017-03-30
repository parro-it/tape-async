'use strict';
const execa = require('execa');
const test = require('.');

test('support async await functions', function * (t) {
	const result = yield execa('babel-node', ['fixtures/async-await-test']);
	t.equal(result.stdout.split('\n')[2], 'ok 1 should be equal');
});

test('test.only is a function', t => {
	t.equal(typeof test.only, 'function');
	t.end();
});
test('support normal cb termination', function * (t) {
	try {
		yield execa('node', ['fixtures/failing-test']);
		t.fail('Failure expected');
	} catch (err) {
		t.equal(err.stdout.split('\n')[2], 'not ok 1 should be equal');
	}
});

test('log unhandled exceptions', function * (t) {
	try {
		yield execa('node', ['fixtures/unhandled-exception-test']);
		t.fail('Failure expected');
	} catch (err) {
		t.equal(err.stderr.slice(0, 30), '\nUnhandled exception occurred.');
	}
});

test('log unhandled rejection', function * (t) {
	try {
		yield execa('node', ['fixtures/unhandled-rejection-test']);
		t.fail('Failure expected');
	} catch (err) {
		t.equal(err.stderr.slice(0, 30), '\nUnhandled rejection occurred.');
	}
});

test('log unexpected rejections', function * (t) {
	try {
		yield execa('node', ['fixtures/unexpected-rejection-test']);
		t.fail('Failure expected');
	} catch (err) {
		t.equal(err.stdout.split('\n')[2], 'not ok 1 Error: unexpected');
	}
});

test('log unexpected exceptions', function * (t) {
	try {
		yield execa('node', ['fixtures/unexpected-exception-test']);
		t.fail('Failure expected');
	} catch (err) {
		t.equal(err.stdout.split('\n')[2], 'not ok 1 Error: unexpected');
	}
});

test('log test failures', function * (t) {
	try {
		yield execa('node', ['fixtures/failing-test']);
		t.fail('Failure expected');
	} catch (err) {
		t.equal(err.stdout.split('\n')[2], 'not ok 1 should be equal');
	}
});

test('support tests end in cb', function * (t) {
	const result = yield execa('node', ['fixtures/end-in-cb']);
	t.equal(result.stdout, `TAP version 13
# first test
first test start
ok 1 should be equal
first test end
# second test
second test start
ok 2 should be equal
second test end

1..2
# tests 2
# pass  2

# ok
`);
});

test('support generators with plan', function * (t) {
	t.plan(1);
	const result = yield Promise.resolve(42);
	t.equal(result, 42);
});

test('support sync function with plan', t => {
	t.plan(1);
	const result = 42;
	t.equal(result, 42);
});

test('support generators without explicit end', function * (t) {
	const result = yield Promise.resolve(42);
	t.equal(result, 42);
});

test('support generators with explicit end', function * (t) {
	const result = yield Promise.resolve(42);
	t.equal(result, 42);
	t.end();
});

test('support sync function', t => {
	const result = 42;
	t.equal(result, 42);
	t.end();
});

test('support async function', t => {
	const result = 42;
	process.nextTick(() => {
		t.equal(result, 42);
		t.end();
	});
});

test('support async function with plan', t => {
	const result = 42;
	t.plan(1);
	process.nextTick(() => {
		t.equal(result, 42);
	});
});

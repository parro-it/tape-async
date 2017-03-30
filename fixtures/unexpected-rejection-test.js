'use strict';
const test = require('..');

test('this test will fail', function * () {
	throw new Error('unexpected');
});

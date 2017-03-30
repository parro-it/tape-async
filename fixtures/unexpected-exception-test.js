'use strict';
const test = require('..');

test('this test will fail', () => {
	throw new Error('unexpected');
});

'use strict';
const test = require('..');

test('this test will fail', () => {
	Promise.reject(new Error('unhandled'));
});

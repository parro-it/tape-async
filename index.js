"use strict";


const tape = require('tape');
const isGenerator = require('is-generator');
const isPromise = require('is-promise');
const defined = require('defined');
const bind = require('function-bind');
const has = require('has');
const isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const co = require('co');


module.exports = tape;

process.on("uncaughtException", (err) => {
	process.stderr.write(
		`\nUnhandled exception occurred. One of your test may have failed silently.\n${err.stack}\n`
	);
	process.exit(-1);
});

process.on("unhandledRejection", (err) => {
	process.stderr.write(
		`\nUnhandled rejection occurred. One of your test may have failed silently.\n${err.stack}\n`
	);
	process.exit(-1);
});

// Maintain tape@1 compatibility
tape.Test.prototype._end = tape.Test.prototype._end || tape.Test.prototype.end;

tape.Test.prototype.deferred = function () {
	this._deferred = true;
};

tape.Test.prototype.run = function () {
	if (!this._cb || this._skip) {
		return this._end();
	}

	this.emit("prerun");
	this._deferred = false;

	const success = () =>
		setImmediate(() => {
			this._end();
			this.emit("run");
		});

	const failure = (err) => {
		this.error(err);
		return this._end();
	};

	const testFn = this._cb;

	let result;

	try {
		result = testFn(this);
	} catch (err) {
		return failure(err);
	}

	if (isGenerator(result)) {
		return co(function* () {
			yield result;
		})
			.then(success)
			.catch(failure);
	}

	if (isPromise(result)) {
		return result.then(success).catch(failure);
	}

	if (!this._deferred) {
		this.emit("run");
	}

	return true;
};

tape.Test.prototype.throws = async function(fn, expected, msg, extra) {
  var caught = undefined;
  var message = undefined;
  var passed = undefined;

  if (typeof expected === 'string') {
    msg = expected;
    expected = undefined;
  }

  try {
    await fn();
  } catch (err) {
    caught = { error: err };
    if ((err !== null) && (!isEnumerable(err, 'message') || !has(err, 'message'))) {
      message = err.message;
      delete err.message;
      err.message = message;
    }
  }

  passed = caught;

  if (expected instanceof RegExp) {
    passed = expected.test(caught && caught.error);
    expected = String(expected);
  }

  if (typeof expected === 'function' && caught) {
    passed = caught.error instanceof expected;
    caught.error = caught.error.constructor;
  }

  this._assert(typeof fn === 'function' && passed, {
    message: defined(msg, 'should throw'),
    operator: 'throws',
    actual: caught && caught.error,
    expected: expected,
    error: !passed && caught && caught.error,
    extra: extra
  });
};

tape.Test.prototype.doesNotThrow = async function(fn, expected, msg, extra) {
  var caught = undefined;

  if (typeof expected === 'string') {
    msg = expected;
    expected = undefined;
  }

  try {
    await fn();
  } catch (err) {
    caught = { error: err };
  }
  this._assert(!caught, {
    message: defined(msg, 'should not throw'),
    operator: 'throws',
    actual: caught && caught.error,
    expected: expected,
    error: caught && caught.error,
    extra: extra
  });
};

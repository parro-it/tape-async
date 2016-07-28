'use strict';

const tape = require('tape');
const isGenerator = require('is-generator');
const isPromise = require('is-promise');
const co = require('co');

module.exports = tape;

process.on('uncaughtException', err => {
  process.stderr.write(`\nUnhandled exception occurred. One of your test may have failed silently.\n${err.stack}\n`);
  process.exit(-1);
});

process.on('unhandledRejection', err => {
  process.stderr.write(`\nUnhandled rejection occurred. One of your test may have failed silently.\n${err.stack}\n`);
  process.exit(-1);
});

// Maintain tape@1 compatibility
tape.Test.prototype._end = (
  tape.Test.prototype._end ||
  tape.Test.prototype.end
);

tape.Test.prototype.deferred = function deferred() {
  this._deferred = true;
};

tape.Test.prototype.run = function run() {
  if (!this._cb || this._skip) {
    return this._end();
  }

  this.emit('prerun');
  this._deferred = false;

  const success = () => setImmediate(() => {
    this._end();
    this.emit('run');
  });

  const failure = err  => {
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
    return co(function * () {
      yield result;
    })
      .then(success)
      .catch(failure);
  }

  if (isPromise(result)) {
    return result.then(success)
      .catch(failure);
  }

  if (!this._deferred) {
    this.emit('run');
  }

  return true;
};

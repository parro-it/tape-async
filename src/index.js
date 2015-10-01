'use strict';

const test = require('tape');
const co = require('co');

function createTest(t, title, cb) {
  const testInstance = {
    failReason: null,
    cb: cb,
    title: title,
    t: t,

    removeUncaughtExceptionHandler() {
      // test for process support for
      // browser environment compatibility
      if (typeof process !== 'undefined') {
        // remove handler setup on before test run.
        process.removeListener('uncaughtException', testInstance.fail);
      }
    },

    addUncaughtExceptionHandler() {
      // test for process support for
      // browser environment compatibility
      if (typeof process !== 'undefined') {
        process.on('uncaughtException', testInstance.fail);
      }
    },

    fail(err) {
      if (testInstance.failReason) {
        // fail has already been called
        // return silently.
        return;
      }
      testInstance.failReason = err;

      testInstance.removeUncaughtExceptionHandler();

      testInstance.t.end(err);
    },

    pass() {
      testInstance.fail(undefined);
    }

  };

  testInstance.addUncaughtExceptionHandler();

  return testInstance;
}

function asyncTest(descr, cb) {
  test(descr, t => {
    const testInstance = createTest(t, descr, cb);

    const wrappedCb = co.wrap(cb);
    wrappedCb(t)
      .then(testInstance.pass)
      .catch(testInstance.fail);
  });
}

function syncTest(descr, cb) {
  test(descr, t => {
    const testInstance = createTest(t, descr, cb);
    try {
      cb(t);
      testInstance.pass();
    } catch (err) {
      testInstance.fail(err);
    }
  });
}

asyncTest.syncTest = syncTest;
module.exports = asyncTest;

const test = require('..');

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
  t.plan(1);
  const result = 42;
  t.equal(result, 42);
});


import test from 'tape-async';

// use a library that return a promise to simplify test code
import superagentPromise from 'superagent-promise';

// ...other setup stuff

test(
  'use the first test in the file to setup the test suite',
  // here since `tape-async` manage the call to t.end for you,
  // you can simplify the test to a single function.
  recreateDatabase
);

test(`getUsersRoles: /users/id/roles returns success when franchisor owner deletes her own roles`, async (assert) => {

  const newToken = await helper.getTokenForUser(requesteeUserId);
  const result = await superagentPromise
    .post(testData.url + `users/` + requesteeUserId + `/roles`)
    .set('token', newToken)
    .send({'franchiseeId': null, 'franchisorId': 'f1a', 'roles': []})
    .end();

  const json = JSON.parse(result.text);
  assert.equals(json.errorCode, ResponseErrorCode.noError);
  assert.false(json.data);
  const dbResult = await db.runQuery(`select * from dbo.users_roles where users_id = '` + requesteeUserId + `'`);
  assert.equals(dbResult.rows.length, 0);
  // assert.end(); no need to end the test.

  // if somethink throws in this function, tape-async automatically catch the error.
});


// ... lots more tests ...

test(
  'use the last test in the file to tearDown the test suite',
  // here since `tape-async` just expect a promise as return value of your test method
  // you can simplify the test to a single expression.
  () => startedServer.stop()
);


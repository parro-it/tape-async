"use strict";
const test = require("..");

test("this test will fail", function* (t) {
	t.equal("not ok", "ok");
});

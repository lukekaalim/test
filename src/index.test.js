// @flow strict
const { expectAll, expectTrue } = require('..');
const indexModule = require('./index');

const indexExpectations = expectAll('Expect index to export the public api', [
  expectTrue('Expect the assertion constructors to be present', !!indexModule.assert && !!indexModule.createAssertion),
  expectTrue('Expect the expectation constructors to be present', !!indexModule.expect && !!indexModule.createExpectation),
]);

module.exports = {
  indexExpectations,
};

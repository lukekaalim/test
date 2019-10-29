// @flow strict
const { assert } = require('..');
const indexModule = require('./index');

const assertEquality = (a, b) => {
  const aDescription = JSON.stringify(a) || 'The first argument';
  const bDescription = JSON.stringify(b) || 'The second argument';
  if (a === b) {
    return assert(`${aDescription} === ${bDescription}`, true);
  }
  return assert(`${aDescription} !== ${bDescription}`, false);
}

const indexExpectations = assert('Expect index to export the public api', [
  assert('assert and createAssertion should be exported', [
    assert('assert is exported', assertEquality(typeof indexModule.assert, 'function')),
    assert('assert is exported', assertEquality(typeof indexModule.createAssertion, 'function')),
  ]),
  assert('Expect the assert to be an alias for createAssertion', assertEquality(indexModule.assert, indexModule.createAssertion)),
]);

module.exports = {
  indexExpectations,
};

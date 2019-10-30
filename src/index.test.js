// @flow strict
const { assert, expect } = require('..');
const indexModule = require('./index');

const assertEquality = (a, b) => {
  const aDescription = JSON.stringify(a) || JSON.stringify(typeof a);
  const bDescription = JSON.stringify(b) || JSON.stringify(typeof b);
  if (a === b) {
    return assert(`${aDescription} === ${bDescription}`, true);
  }
  return assert(`${aDescription} !== ${bDescription}`, false);
}

const indexExpectations = () => {
  return expect('Expect index to export the public api', [
    expect('tools for assertion should be exported at the top level', [
      expect('assert is exported', [assertEquality(typeof indexModule.assert, 'function')]),
      expect('createAssertion is exported', [assertEquality(typeof indexModule.createAssertion, 'function')]),

      expect('expect is exported', [assertEquality(typeof indexModule.expect, 'function')]),
      expect('createExpectation is exported', [assertEquality(typeof indexModule.createExpectation, 'function')]),
    ]),
    expect('Expect the assert to be an alias for createAssertion', [assertEquality(indexModule.assert, indexModule.createAssertion)]),
    expect('Expect the expect to be an alias for createExpectation', [assertEquality(indexModule.expect, indexModule.createExpectation)]),
  ]);
};

module.exports = {
  indexExpectations,
};

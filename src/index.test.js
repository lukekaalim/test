// @flow strict
/*:: import type { Assertion } from './assert'; */
const { assert } = require('..');
const indexModule = require('./index');

const assertEquality = (a, b) => {
  const aDescription = JSON.stringify(a) || JSON.stringify(typeof a);
  const bDescription = JSON.stringify(b) || JSON.stringify(typeof b);
  if (a === b) {
    return assert(`${aDescription} === ${bDescription}`, true);
  }
  return assert(`${aDescription} !== ${bDescription}`, false);
}

const indexExpectations = ()/*: Assertion*/ => {
  return assert('Expect index to export the public api', [
    assert('tools for assertion should be exported at the top level', [
      assert('assert is exported', [assertEquality(typeof indexModule.assert, 'function')]),
      assert('createAssertion is exported', [assertEquality(typeof indexModule.createAssertion, 'function')]),
    ]),
    assert('Expect the assert to be an alias for createAssertion', [assertEquality(indexModule.assert, indexModule.createAssertion)]),
  ]);
};

module.exports = {
  indexExpectations,
};

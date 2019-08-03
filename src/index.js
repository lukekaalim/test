// @flow strict
const { assert, createAssertion } = require('./assertion');
const { expect, createExpectation } = require('./expectation');
const { expectTrue, expectAll, expectToThrow } = require('./expectations');
const { colorReporter, booleanReporter } = require('./reporters');

module.exports = {
  // Assertion constructor
  assert,
  createAssertion,
  // Expectation constructor
  expect,
  createExpectation,
  // Simple expectations
  expectTrue,
  expectAll,
  expectToThrow,
  // Simple reporters
  colorReporter,
  booleanReporter,
};
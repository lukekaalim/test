// @flow strict
const { assert, createAssertion } = require('./assertion');
const { expect, createExpectation } = require('./expectation');
const { expectTrue, expectAll, expectToThrow, expectEventually } = require('./expectations');
const { colorReporter, booleanReporter, emojiReporter } = require('./reporters');

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
  expectEventually,
  // Simple reporters
  colorReporter,
  booleanReporter,
  emojiReporter,
};
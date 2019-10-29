// @flow strict
const { colorReporter } = require('./reporters/colorReporter');
const { emojiReporter, unicodeReporter } = require('./reporters/emojiReporter');
/*::
import type { Assertion } from './assertion';
*/

/**
 * Returns true if the assertion is Valid, or False if is it not
 * @param {Assertion} assertion 
 */
const booleanReporter = (assertion/*: Assertion*/) => {
  return assertion.validatesExpectation;
};

const exitCodeReporter = (assertion/*: Assertion*/) => {
  if (assertion.validatesExpectation) {
    process.exitCode = 0;
    return 0;
  }
  process.exitCode = 1;
  return 1;
}

const tapReporter = (assertion/*: Assertion*/) => {

};

module.exports = {
  colorReporter,
  booleanReporter,
  emojiReporter,
  unicodeReporter,
  exitCodeReporter,
  tapReporter,
};

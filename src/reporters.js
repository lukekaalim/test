// @flow strict
const { colors } = require('tiny-ansi-colors');
/*::
import type { Assertion } from './assertion';
*/

const strMult = (text, multiplier) => {
  let result = '';
  for (let i = 0; i < multiplier; i++) {
    result += text;
  }
  return result;
};

/**
 * Returns a multi-lined colored string for display in a terminal,
 * reporting on all childAssertions
 * @param {Assertion} assertion 
 * @param {?number} nestingLevel 
 */
const colorReporter = (
  { validatesExpectation: valid, description: desc, childAssertions: children }/*: Assertion*/,
  nestingLevel/*: number*/ = 0
) => {
  const color = valid ? 'black' : 'white';
  const background = valid ? 'green' : 'red';
  const line = colors(desc, { color, background });
  
  const childLines = children
    .map(assertion => colorReporter(assertion, nestingLevel + 1))
    .map(childLine => strMult(' ', nestingLevel + 1) + childLine);
  return [
    line,
    ...childLines,
  ].join('\n');
};

/**
 * Returns true if the assertion is Valid, or False if is it not
 * @param {Assertion} assertion 
 */
const booleanReporter = (assertion/*: Assertion*/) => {
  return assertion.validatesExpectation;
};

const emojiReporter = (assertion/*: Assertion*/, nestingLevel/*: number*/ = 0) => {
  const emoji = assertion.validatesExpectation ? '✔️' : '❌';
  const line = `${emoji} ${assertion.description}`;
  
  const childLines = assertion.childAssertions
    .map(assertion => emojiReporter(assertion, nestingLevel + 1))
    .map(childLine => strMult(' ', nestingLevel + 1) + childLine);
  return [
    line,
    ...childLines,
  ].join('\n');
}

module.exports = {
  colorReporter,
  booleanReporter,
  emojiReporter,
};

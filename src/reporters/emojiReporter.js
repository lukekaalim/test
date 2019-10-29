// @flow strict
/*::
import type { Assertion } from '../assertion';
*/

const emojiPass = '✔️';
const emojiFail = '❌';

const unicodePass = '✓';
const unicodeFail = '×';

const emojiReporter = (assertion/*: Assertion*/, nestingLevel/*: number*/ = 0) => {
  const emoji = assertion.validatesExpectation ? emojiPass : emojiFail;
  const line = `${emoji} ${assertion.description}` + (assertion.source ? ` (${assertion.source})` : '');
  
  const childLines = assertion.childAssertions
    .map(assertion => emojiReporter(assertion, nestingLevel + 1))
    .map(childLine => ' '.repeat(nestingLevel + 1) + childLine);

  return [
    line,
    ...childLines,
  ].join('\n');
}

const unicodeReporter = (assertion/*: Assertion*/, nestingLevel/*: number*/ = 0) => {
  const emoji = assertion.validatesExpectation ? unicodePass : unicodeFail;
  const line = `${emoji} ${assertion.description}` + (assertion.source ? ` (${assertion.source})` : '');
  
  const childLines = assertion.childAssertions
    .map(assertion => unicodeReporter(assertion, nestingLevel + 1))
    .map(childLine => ' '.repeat(nestingLevel + 1) + childLine);

  return [
    line,
    ...childLines,
  ].join('\n');
}

module.exports = {
  emojiReporter,
  unicodeReporter,
}
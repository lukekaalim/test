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

module.exports = {
  colorReporter,
};

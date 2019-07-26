// @flow strict
import { colors } from 'tiny-ansi-colors';
/*::
import type { Assertion } from '../src';
*/

const colorReporter = (assertion/*: Assertion*/) => {
  if (assertion.validatesExpectation) {
    return colors(assertion.description, { color: 'black', background: 'green' });
  }
  return colors(assertion.description, { color: 'white', background: 'red' });
};

const strMult = (text, multiplier) => {
  let result = '';
  for (let i = 0; i < multiplier; i++) {
    result += text;
  }
  return result;
};

const recursiveColorReporter = (assertion/*: Assertion*/, nestingLevel/*: number*/ = 0)/*: string*/ => {
  const mainLine = colorReporter(assertion);
  const childLines = assertion.childAssertions
    .map(assertion => recursiveColorReporter(assertion, nestingLevel + 1))
    .map(report => strMult(' ', nestingLevel + 1) + report);
  return [
    mainLine,
    ...childLines,
  ].join('\n');
}


export {
  colorReporter,
  recursiveColorReporter
};

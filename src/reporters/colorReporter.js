// @flow strict
/*::
import type { Assertion } from '../assert';
*/

/*::
type ColorReporterConfig = {
  showSource?: boolean,
  isolateFailure?: boolean,
  isolateSuccess?: boolean,
};
*/
const DEFAULT_CONFIG = {
  showSource: false,
}

const ansiEscape = '\u001b';

const ansiFontRed = ansiEscape + '[31m';
const ansiFontGreen = ansiEscape + '[32m';
const ansiFontWhite = ansiEscape + '[37;1m';
const ansiFontBlack = ansiEscape + '[30m';

const ansiFontBold = ansiEscape + '[1m'
const ansiFontUnderline = ansiEscape + '[4m';

const ansiBackgroundRed = ansiEscape + '[41m';
const ansiBackgroundsGreen = ansiEscape + '[42m';

const ansiReset = ansiEscape + '[0m';

/**
 * Returns a multi-lined colored string for display in a terminal,
 * reporting on all childAssertions
 * @param {Assertion} assertion 
 * @param {?number} nestingLevel 
 */
const colorReporter = (
  { matchedExpectation, expectationDescription, childAssertions }/*: Assertion*/,
  nestingLevel/*: number*/ = 0,
  config/*: ColorReporterConfig*/ = DEFAULT_CONFIG,
) => {
  const statusText = matchedExpectation ?
    `${ansiBackgroundsGreen + ansiFontBlack} PASS ${ansiReset}` :
    `${ansiBackgroundRed + ansiFontWhite} FAIL ${ansiReset}`;

  return [
    [statusText, '  '.repeat(nestingLevel), ' ', expectationDescription].join(''),
    ...childAssertions
      .filter(assertion => config.isolateSuccess ? !matchedExpectation : true)
      .filter(assertion => config.isolateFailure ? (matchedExpectation ? true : !assertion.matchedExpectation) : true)
      .map(assertion => colorReporter(assertion, nestingLevel + 1, config))
  ].join('\n');
};

export {
  colorReporter
};

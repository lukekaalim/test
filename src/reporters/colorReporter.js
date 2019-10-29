// @flow strict
/*::
import type { Assertion } from '../assertion';
*/

/*::
type ColorReporterConfig = {
  showSource?: boolean,
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
  { validatesExpectation, description, childAssertions, source }/*: Assertion*/,
  nestingLevel/*: number*/ = 0,
  config/*: ColorReporterConfig*/ = DEFAULT_CONFIG,
) => {
  const statusText = validatesExpectation ?
    `${ansiBackgroundsGreen + ansiFontBlack} PASS ${ansiReset}` :
    `${ansiBackgroundRed + ansiFontWhite} FAIL ${ansiReset}`;

  const sourceText = config.showSource && source ? [' (', ansiFontGreen, ansiFontUnderline, source, ansiReset, ')'].join('') : '';

  return [
    [statusText, ' ', description, sourceText].join(''),
    ...childAssertions
      .map(assertion => ' '.repeat(nestingLevel + 1) + colorReporter(assertion, nestingLevel + 1))
  ].join('\n');
};

module.exports = {
  colorReporter
};

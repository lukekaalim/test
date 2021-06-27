// @flow strict
/*::
import type { Assertion } from '../assert';
*/

/*::
type ColorReporterConfig = {
  showSource?: boolean,
  isolateFailure?: boolean,
  isolateSuccess?: boolean,
  maxDepth?: number,
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
  { result, title, because }/*: Assertion*/,
  depth/*: number*/ = 0,
  config/*: ColorReporterConfig*/ = DEFAULT_CONFIG,
)/*: string*/ => {
  const statusText = result ?
    `${ansiBackgroundsGreen + ansiFontBlack} PASS ${ansiReset}` :
    `${ansiBackgroundRed + ansiFontWhite} FAIL ${ansiReset}`;
  
  const line = [statusText, '  '.repeat(depth), ' ', title].join('');
  const { maxDepth = Number.POSITIVE_INFINITY } = config;
  if (depth >= maxDepth)
    return line;

  return [
    line,
    ...because
      .filter(assertion => config.isolateSuccess ? !result : true)
      .filter(assertion => config.isolateFailure ? (result ? true : !assertion.result) : true)
      .map(assertion => colorReporter(assertion, depth + 1, config))
  ].join('\n');
};

module.exports = {
  colorReporter
};

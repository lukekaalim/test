import colors from 'colors-cli';
import { didTestPass } from './lib';

const { blue, yellow, red, green } = colors;

const colorfulReporter = (testResults) => {
  const output = [];
  output.push(blue(`Ran ${testResults.length} tests`));
  for (const result of testResults) {
    const testPassed = didTestPass(result);
    if (testPassed) {
      output.push(green(`Pass | ${result.name} (${result.duration}ms)`));
    } else {
      output.push(red(`Fail | ${result.name} (${result.duration}ms)`));
      for (const failedAssertion of result.assertions.filter(assertion => assertion.result === 'fail')) {
        output.push(yellow(`  ${failedAssertion.name}: ${failedAssertion.message}`));
      }
    }
  }
  const allTestsPassed = testResults.every(didTestPass)
  if (allTestsPassed) {
    output.push(green(`All tests passed!`));
  } else {
    output.push(yellow(`${testResults.filter(result => !didTestPass(result)).length} tests failed`));
  }
  return output.join('\n');
};

export {
  colorfulReporter
};

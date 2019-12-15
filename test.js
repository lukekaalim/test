// @flow
import { assert, colorReporter, exitCodeReporter } from './src/index.js';
import { indexExpectations } from './src/index.test.js';

const testPackage = async () => {
  const assertion = assert('@lukekaalim/test should provide a simple testing API for verifying expectations', [indexExpectations()]);
  const report = colorReporter(assertion, 0, { isolateFailure: true, isolateSuccess: false });

  process.stdout.write(report + '\n');
  console.log(`Exiting with code: ${exitCodeReporter(assertion)}`);
};

testPackage();
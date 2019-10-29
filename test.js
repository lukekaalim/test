// @flow
const { assert, colorReporter, exitCodeReporter } = require('./');

const { indexExpectations } = require('./src/index.test');

const testPackage = async () => {
  const assertion = assert('@lukekaalim/test should provide a simple testing API for verifying expectations', [indexExpectations]);
  const report = colorReporter(assertion);

  process.stdout.write(report + '\n');
  console.log(`Exiting with code: ${exitCodeReporter(assertion)}`);
};

if (require.main === module) {
  testPackage();
}
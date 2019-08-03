// @flow
const { colorReporter, expectAll } = require('./');

const { expectationsTest } = require('./src/expectations.test');

const testPackage = async () => {
  const expectation = expectAll('lk-test', [expectationsTest]);
  const assertion = await expectation.test();
  const report = colorReporter(assertion);

  process.stdout.write(report + '\n');
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
  console.log(`Exiting with code: ${process.exitCode}`);
};

if (require.main === module) {
  testPackage();
}
// @flow
const { colorReporter, booleanReporter, expectAll } = require('./');

const { expectationsTest } = require('./src/expectations.test');
const { indexExpectations } = require('./src/index.test');

const testPackage = async () => {
  const expectation = expectAll('lk-test', [expectationsTest, indexExpectations]);
  const assertion = await expectation.test();
  const report = colorReporter(assertion);

  process.stdout.write(report + '\n');
  process.exitCode = booleanReporter(assertion) ? 0 : 1;
  console.log(`Exiting with code: ${process.exitCode}`);
};

if (require.main === module) {
  testPackage();
}
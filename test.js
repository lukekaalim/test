// @flow
const { recursiveColorReporter } = require('./');
const { libraryTests } = require('./src/index.test');

const testPackage = async () => {
  const assertion = await libraryTests.test();
  const report = recursiveColorReporter(assertion);
  process.stdout.write(report + '\n');
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
  console.log(`Exiting with code: ${process.exitCode}`);
};

if (require.main === module) {
  testPackage();
}
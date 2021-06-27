// @flow
const { assert, colorReporter, exitCodeReporter } = require('./');
const { assertStruct } = require('./src');

const { indexExpectations } = require('./src/index.test');

const testPackage = async () => {
  const assertion = assert('@lukekaalim/test should provide a simple testing API for verifying expectations', [
    indexExpectations(),
    testAssertions(),
    structuralEquality(),
  ]);
  const report = colorReporter(assertion, 0, { isolateFailure: true,  });

  process.stdout.write(report + '\n');
  console.log(`Exiting with code: ${exitCodeReporter(assertion)}`);
};

const testAssertions = () => {
  const testA = () => {
    return assert('a', true);
  };
  const testB = () => {
    return assert('b', false);
  };
  const complexAssertion = assert('root', [
    testA(),
    testB(),
  ]);

  return assert('Complex assertion is false', !complexAssertion.result);
};

const structuralEquality = () => {
  const a = {
    yes: 'one',
    no: { number: 10 }
  };
  const b = {
    yes: 'one',
    no: { number:  10 }
  };
  return assertStruct({ a, b });
}

if (require.main === module) {
  testPackage();
}
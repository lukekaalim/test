// @flow strict

/*::
export type Assertion = {
  actualAssertion: string,
  isValid: boolean,
};

export type Expectation = {
  expectedAssertion: string,
  test: () => Promise<Array<Assertion>>,
};
*/

const createTest = (
  expectation/*: string*/,
  run/*: () => Promise<Array<Test>>*/
) => {
  return {
    run,
  }
};

const createTestResult = (name/*: string*/, assertions, duration) => {
  return {
    name,
    assertions,
    duration,
  };
};

const createTest = (name/*: string*/, testFunction) => {
  const run = async () => {
    const startTime = Date.now();
    try {
      const assertions = await testFunction() || [createAssertion('No Errors', 'pass', 'Test executed without throwing any errors')];
      const duration = Date.now() - startTime;

      return createTestResult(name, assertions, duration);
    } catch (testError) {
      const assertions = [createAssertion('No Errors', 'fail', testError.stack)];
      const duration = Date.now() - startTime;

      return createTestResult(name, assertions, duration);
    }
  };

  return {
    run,
  };
};

const createTestSuite = (childTests, suiteName) => {
  const run = async () => {
    const childTestResults = await Promise.all(childTests.map(childTest => childTest.run()));
    const suiteTestResults = childTestResults.map(childTestResult => createTestResult(
      `${suiteName}: ${childTestResult.name}`,
      childTestResult.assertions,
      childTestResult.duration,
    ));
    return suiteTestResults;
  };

  return {
    run,
  }
};

const didTestPass = (testResult) => {
  return testResult.assertions.every(assertion => assertion.result === 'pass');
};

export {
  createAssertion,
  createTestResult,
  createTest,
  createTestSuite,
  didTestPass,
};
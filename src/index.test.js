// @flow
const {
  expectTests,
  createAssertion,
  createExpectation
} = require('..');

const expectAnything = createExpectation(() => createAssertion('Anything was provided', true, []));
const expectImpossible = createExpectation(() => createAssertion('Impossible was provided', false, []));

const expectFailure = (description, expectation) => (
  createExpectation(async () => createAssertion(
    description,
    await expectation.test().then(ass => !ass.validatesExpectation),
    [],
  ))
);

const expectSuccess = (description, expectation) => (
  createExpectation(async () => createAssertion(
    description,
    await expectation.test().then(ass => ass.validatesExpectation),
    [],
  ))
);

const failureTest = expectFailure('To verify that expectTests fails when one child fails',
  expectTests('To do the impossible', async () => [
    expectAnything,
    expectImpossible,
  ]),
);
const successTest = expectSuccess('To verify that expectTests succeed when no child fails',
  expectTests('To do anything', async () => [
    expectAnything,
    expectAnything,
  ]),
);

const libraryTests = expectTests('To verify the library can create, suceed, and fail based on assertions', async () => [
  failureTest,
  successTest,
  expectTests('nested', async () => [failureTest, failureTest])
]);

module.exports.libraryTests = libraryTests;
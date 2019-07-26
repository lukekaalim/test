// @flow
const { test, assert, expect } = require('..');

const expectAnything = expect(() => assert('Anything was provided', true, []));
const expectImpossible = expect(() => assert('Impossible was provided', false, []));

const expectFailure = (description, expectation) => (
  expect(async () => assert(
    description,
    await expectation.test().then(ass => !ass.validatesExpectation),
    [],
  ))
);

const expectSuccess = (description, expectation) => (
  expect(async () => assert(
    description,
    await expectation.test().then(ass => ass.validatesExpectation),
    [],
  ))
);

const libraryTests = test('To verify the library can create, suceed, and fail based on assertions', async () => [
  expectFailure('To verify that expectTests fails when one child fails',
    test('To do the impossible', async () => [
      expectAnything,
      expectImpossible,
    ]),
  ),
  expectSuccess('To verify that expectTests succeed when no child fails',
    test('To do anything', async () => [
      expectAnything,
      expectAnything,
    ]),
  )
]);

module.exports.libraryTests = libraryTests;
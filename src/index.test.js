// @flow strict
const { expectAll, assert, expect } = require('..');

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

const libraryTests = expectAll('To verify the library can create, succeed, and fail based on assertions', [
  expectFailure('To verify that expectTests fails when one child fails',
  expectAll('To do the impossible', [
      expectAnything,
      expectImpossible,
    ]),
  ),
  expectSuccess('To verify that expectTests succeed when no child fails',
  expectAll('To do anything', [
      expectAnything,
      expectAnything,
    ]),
  )
]);

module.exports.libraryTests = libraryTests;
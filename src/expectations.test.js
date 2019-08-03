// @flow strict
const { expectAll, assert, expect } = require('..');

const expectAnything = expect(() => assert('Anything was provided', true, []));
const expectImpossible = expect(() => assert('Impossible was provided', false, []));

const expectFailure = (description, expectation) => (
  expect(async () => assert(
    description,
    await expectation.test().then(ass => !ass.validatesExpectation),
  ))
);

const expectSuccess = (description, expectation) => (
  expect(async () => assert(
    description,
    await expectation.test().then(ass => ass.validatesExpectation),
  ))
);

const expectThrowsToFail = expectFailure(
  'Expected an uncaught error thrown during an expectation to fail',
  expect(() => { throw new Error('Uncaught Error'); })
)

const expectAllExpectations = expectAll('Expect that "expectAll" correctly creates childAssertions', [
  expectFailure(
    'To verify that "expectAll" fails when one child fails',
    expectAll('To do the impossible', [
      expectAnything,
      expectImpossible,
    ]),
  ),
  expectSuccess(
    'To verify that "expectAll" succeed when no child fails',
    expectAll('To do anything', [
      expectAnything,
      expectAnything,
    ]),
  ),
]);

const expectationsTest = expectAll('expectations', [
  expectAllExpectations,
  expectThrowsToFail,
]);


module.exports = {
  expectationsTest,
};
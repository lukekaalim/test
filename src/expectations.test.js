// @flow strict
const { expectAll, assert, expect, expectEventually, expectTrue } = require('..');

const expectAnything = expect(() => assert('Anything was provided', true));
const expectImpossible = expect(() => assert('Impossible was provided', false));

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

const eventuallyExpectations = expectAll('expectEventually', [
  expectSuccess('Expect eventually should return the underlying assertion (success)', expectEventually(async () => {
    const setupNumber = await Promise.resolve(10);
    return expectTrue('10 + 10 should equal 20', setupNumber + setupNumber === 20);
  })),
  expectFailure('Expect eventually should return the underlying assertion (failure)', expectEventually(async () => {
    const setupNumber = await Promise.resolve(10);
    return expectTrue('10 + 10 should equal 20', setupNumber + setupNumber === 500);
  })),
  expectSuccess('Expect eventually should work with a normal function and not a promise', expectEventually(() => {
    const setupNumber = 10;
    return expectTrue('10 + 10 should equal 20', setupNumber + setupNumber === 20);
  })),
]);

const expectationsTest = expectAll('expectations', [
  expectAllExpectations,
  eventuallyExpectations,
  expectThrowsToFail,
]);


module.exports = {
  expectationsTest,
};
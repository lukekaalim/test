// @flow strict
const { expect } = require('./expectation')
const { assert } = require('./assertion')
/*::
import type { Expectation } from './expectation';
import type { Assertion } from './assertion';
*/

const expectTrue = (
  description/*: string*/,
  truthyVal/*: boolean*/,
) => expect(() => assert(
  truthyVal ? description : description + ' (was not true)',
  truthyVal,
));

const expectToThrow = /*:: <TError: typeof Error>*/(
  description/*: string*/,
  throwingFunc/*: () => mixed*/,
  errorToCatch/*:: ?: TError*/,
) => expect(async () => {
  try {
    await throwingFunc();
    return assert(description + ' (Did not throw error)', false);
  } catch (error) {
    if (error instanceof (errorToCatch || Error)) {
      return assert(description, true);
    }
    return assert(description + ' (Threw an different error than expected)', false);
  }
});

const expectAll = (
  description/*: string*/,
  children/*: Array<Expectation>*/,
) => expect(async () => {
  const childTestPromises = children.map(ex => ex.test());
  const childAssertions = await Promise.all(childTestPromises);

  const validatesExpectation = childAssertions.every(assertion => assertion.validatesExpectation);

  return assert(
    description,
    validatesExpectation,
    childAssertions,
  );
});

const expectEventually = (
  getExpectation/*: () => Promise<Expectation> | Expectation*/,
) => expect(async () => {
  const expectation = await getExpectation();
  const assertion = await expectation.test();
  return assertion;
});

module.exports = {
  expectTrue,
  expectToThrow,
  expectAll,
  expectEventually,
};

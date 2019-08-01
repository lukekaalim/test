// @flow strict

/*::
export type Assertion = {
  description: string,
  validatesExpectation: boolean,
  childAssertions: Array<Assertion>,
};

export type Expectation = { test: () => Promise<Assertion> };
*/

export const createAssertion = (
  description/*: string*/,
  validatesExpectation/*: boolean*/,
  childAssertions/*: Array<Assertion>*/ = [],
)/*: Assertion*/ => ({
  description,
  validatesExpectation,
  childAssertions,
});
export const assert = createAssertion;

export const createExpectation = (
  verifyExpectation/*: () => Assertion | Promise<Assertion>*/
)/*: Expectation*/ => {
  const test = async ()/*: Promise<Assertion>*/ => {
    return verifyExpectation();
  };

  return {
    test,
  };
};
export const expect = createExpectation;

export const expectTrue = (
  description/*: string*/,
  valueToBeTruthy/*: boolean*/,
) => createExpectation(() => createAssertion(
  valueToBeTruthy ? description : description + ' (was not true)',
  valueToBeTruthy,
  [],
));

export const expectToThrowError = /*:: <T: typeof Error>*/(
  description/*: string*/,
  funcToThrowError/*: () => mixed*/,
  errorToCatch/*:: ?: T*/,
) => expect(() => {
  try {
    funcToThrowError();
    return assert(description + ' (Did not throw error)', false);
  } catch (error) {
    if ((error/*: Error*/) instanceof (errorToCatch || Error)) {
      return assert(description, true);
    }
    return assert(description + ' (Threw an different error than expected)', false);
  }
});

export const expectAll = (
  description/*: string*/,
  children/*: Array<Expectation>*/,
) => createExpectation(async () => {
  const childTestPromises/*: Array<Promise<Assertion>> */ = children.map(ex => ex.test());
  const childAssertions/*: Array<Assertion> */ = await Promise.all(childTestPromises);

  const validatesExpectation = childAssertions.every(assertion => assertion.validatesExpectation);

  return createAssertion(
    description,
    validatesExpectation,
    childAssertions,
  );
});

export const expectEventuallyAll = (
  description/*: string*/,
  children/*: () => Promise<Array<Expectation>>*/,
) => createExpectation(async () => {
  const expectation = expectAll(description, await children());
  return expectation.test();
});

export const test = expectEventuallyAll;

export * from './reporter';
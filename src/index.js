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
  verififyExpectation/*: () => Assertion | Promise<Assertion>*/
)/*: Expectation*/ => {
  const test = async ()/*: Promise<Assertion>*/ => {
    return verififyExpectation();
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

export const expectTests = (
  description/*: string*/,
  getChildExpectations/*: () => Promise<Array<Expectation>>*/,
) => createExpectation(async () => {
  const childExpectations = await getChildExpectations();
  const childTestPromises/*: Array<Promise<Assertion>> */ = childExpectations.map(ex => ex.test());
  const childAssertions/*: Array<Assertion> */ = await Promise.all(childTestPromises);

  const validatesExpectation = childAssertions.every(assertion => assertion.validatesExpectation);

  return createAssertion(
    description,
    validatesExpectation,
    childAssertions,
  );
});
export const test = expectTests;

export * from './reporter';
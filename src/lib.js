// @flow strict

/*::
export type Assertion = {
  description: string,
  validatesExpectation: boolean,
  childAssertions: Array<Assertion>,
};

export type Expectation = () => Promise<Assertion> | Assertion;
*/

export const createAssertion = (
  description/*: string*/,
  validatesExpectation/*: boolean*/,
  childAssertions/*: Array<Assertion>*/,
)/*: Assertion*/ => ({
  description,
  validatesExpectation,
  childAssertions,
});

export const expectTests = (
  description/*: string*/,
  verifyExpectation/*: () => Promise<Array<Expectation>> | Array<Expectation>*/,
)/*: Expectation*/ => {
  const test = async () => {
    const childExpectations = await verifyExpectation();
    const childTestPromises = childExpectations.map(ex => ex());
    const childAssertions/*: Array<Assertion> */ = await Promise.all(childTestPromises);

    const validatesExpectation = childAssertions.every(assertion => assertion.validatesExpectation);

    return createAssertion(
      description,
      validatesExpectation,
      childAssertions,
    );
  };

  return test;
};
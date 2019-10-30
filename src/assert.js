// @flow strict
/*::
export type Assertion = {
  expectationDescription: string,
  matchedExpectation: boolean,
  childAssertions: Array<Assertion>,
};

export type CreateAssertion = (
  description: string,
  isValid: boolean | Assertion | Assertion[],
  source?: string
) => Assertion;
*/

const createAssertion = (expectationDescription/*: string*/, matchedExpectation/*: boolean | Assertion[]*/)/*: Assertion*/ => {
  if (typeof matchedExpectation === 'boolean') {
    return {
      expectationDescription,
      matchedExpectation,
      childAssertions: [],
    };
  }
  const childAssertions = matchedExpectation;
  return {
    expectationDescription,
    matchedExpectation: childAssertions.every(assertion => assertion.matchedExpectation),
    childAssertions,
  };
}
const assert = createAssertion;

module.exports = {
  createAssertion,
  assert,
};

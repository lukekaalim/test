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

const createAssertion = (expectationDescription/*: string*/, matchedExpectation/*: boolean*/)/*: Assertion*/ => {
  return ({
    expectationDescription,
    matchedExpectation,
    childAssertions: [],
  });
}
const assert = createAssertion;

const createExpectation = (expectationDescription/*: string*/, childAssertions/*: Assertion[]*/) => {
  return ({
    expectationDescription,
    matchedExpectation: childAssertions.every(assertion => assertion.matchedExpectation),
    childAssertions,
  });
}
const expect = createExpectation;

module.exports = {
  createAssertion,
  assert,
  createExpectation,
  expect,
};

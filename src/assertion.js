// @flow strict
/*::
export type Assertion = {
  description: string,
  validatesExpectation: boolean,
  childAssertions: Array<Assertion>,
};
*/

const createAssertion = (
  description/*: string*/,
  isValid/*: boolean | Array<Assertion>*/,
)/*: Assertion*/ => {
  if (typeof isValid === 'boolean') {
    return {
      description,
      validatesExpectation: isValid,
      childAssertions: [],
    };
  } else {
    return {
      description,
      validatesExpectation: isValid.every(assertion => assertion.validatesExpectation),
      childAssertions: isValid,
    };
  }
}
const assert = createAssertion;

module.exports = {
  createAssertion,
  assert,
};

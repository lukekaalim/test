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
  validatesExpectation/*: boolean*/,
  childAssertions/*: Array<Assertion>*/ = [],
)/*: Assertion*/ => ({
  description,
  validatesExpectation,
  childAssertions,
});
const assert = createAssertion;

module.exports = {
  createAssertion,
  assert,
};

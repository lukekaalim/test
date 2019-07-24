// @flow strict

/*::
export type Assertion = {
  description: string,
  validatesExpectation: boolean,
};

export type Expectation = {
  description: string,
  test: () => Promise<Array<Assertion>>,
};
*/

export const createAssertion = (
  description/*: string*/,
  validatesExpectation/*: boolean*/,
)/*: Assertion*/ => ({
  description,
  validatesExpectation,
});

export const createExpectation = (
  description/*: string*/,
  test/*: () => Promise<Array<Assertion>>*/,
)/*: Expectation*/ => ({
  description,
  test,
});

// @flow strict
/*::
export type Assertion = {
  description: string,
  validatesExpectation: boolean,
  childAssertions: Array<Assertion>,
  source: null | string,
};

export type CreateAssertion = (
  description: string,
  isValid: boolean | Assertion | Assertion[],
  source?: string
) => Assertion;
*/

const createAssertion/*: CreateAssertion*/ = (description, isValid, source = null) => {
  if (typeof isValid === 'boolean') {
    return {
      description,
      validatesExpectation: isValid,
      childAssertions: [],
      source,
    };
  } else if (Array.isArray(isValid)) {
    return {
      description,
      validatesExpectation: isValid.every(assertion => assertion.validatesExpectation),
      childAssertions: isValid,
      source,
    };
  } else {
    return {
      description,
      validatesExpectation: isValid.validatesExpectation,
      childAssertions: [isValid],
      source,
    }
  }
}
const assert = createAssertion;

module.exports = {
  createAssertion,
  assert,
};

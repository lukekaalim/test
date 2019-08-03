// @flow strict
/*::
import type { Assertion } from './assertion';
*/
const { assert } = require('./assertion');
/*::
export type Expectation = {
  test: () => Promise<Assertion>
};
*/

const createExpectation = (
  verifyExpectation/*: () => Assertion | Promise<Assertion>*/
)/*: Expectation*/ => {
  const test = async ()/*: Promise<Assertion>*/ => {
    try {
      return await verifyExpectation();
    } catch (error) {
      return assert((error/*: Error*/).stack, false);
    }
  };

  return {
    test,
  };
};
const expect = createExpectation;

module.exports = {
  createExpectation,
  expect,
};

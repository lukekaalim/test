// @flow strict
import { createAssertion } from './lib';
/*::
import type { Assertion } from './lib';
*/

export const expectEquality = (...values/*: Array<mixed>*/) => createAssertion(
  'values are equal',
  values ? values.every((value, index) => index === 0 || value === values[index - 1]) : true,
);

export const not = (assertion/*: Assertion*/) => createAssertion(
  'opposite of: ' + assertion.description,
  !assertion.validatesExpectation,
);
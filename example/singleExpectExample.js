// @flow

/*::
declare opaque type Expectation;
type Assertion = {
  description: string,
  validatesExpectation: boolean,
  childAssertions: Array<Assertion>,
};

declare function expectTest(
  description: string,
  testExpectation: () => Promise<Array<Expectation>>,
): Expectation;

declare function expectTrue(
  description: string,
  truthyExpectation: boolean,
): Expectation;
*/
const createAssertion = (
  description/*: string*/,
  validatesExpectation/*: boolean*/,
  childAssertions/*: Array<Assertion>*/,
)/*: Assertion*/ => ({
  description,
  validatesExpectation,
  childAssertions,
});

const test = expectTest('this test', async () => {
  const a = 1;
  const b = 2;
  const c = 3;

  return [
    expectTrue('this to be true', a === b),
    expectTest('this to be true', async () => {
      return [
        expectTrue('this to be true', c === b),
      ];
    }),
  ];
});
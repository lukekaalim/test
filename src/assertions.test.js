// @flow
const { expectEquality, not, createAssertion, createExpectation } = require('../dist/lk-test.cjs');

const assertionExpectations = [
  createExpectation('Zero values are equal', async () => [
    expectEquality(),
  ]),
  createExpectation('One value are equal', async () => [
    expectEquality(1),
    expectEquality(false),
    expectEquality(null),
    expectEquality('none'),
  ]),
  createExpectation('Two values are equal if they strictly equal', async () => [
    expectEquality(1, 1),
    expectEquality(3, 3),
    expectEquality('3', '3'),
    expectEquality(false, false),
    not(expectEquality(false, true)),
    not(expectEquality(3, 6)),
    not(expectEquality(3, '3')),
    not(expectEquality({}, {})),
    not(expectEquality([], [])),
  ]),
  createExpectation('Three values are equal if they strictly equal', async () => [
    expectEquality(1, 1, 1),
    expectEquality(31, 31, 31),
    not(expectEquality(1, 2, 3)),
    not(expectEquality(2, 2, 3)),
    not(expectEquality(2, 3, 3)),
    not(expectEquality(1, 1, 3)),
    not(expectEquality(1, 2, 1)),
  ]),
  createExpectation('many values are equal if they strictly equal', async () => [
    expectEquality(10, 10, 10, 10, 10, 10, 10, 10, 10, 10),
  ]),
];

module.exports.assertionExpectations = assertionExpectations;
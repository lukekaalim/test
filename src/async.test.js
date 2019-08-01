// @flow strict
const { test, assert, expectTrue } = require('..');

const asyncExpectation = async () => {
  const promiseResult = await Promise.resolve(true);
  return expectTrue('The promise result is true', promiseResult === true);
};

const asyncTest = test('test() is passed an async function that returns an array of expectations', async () => [
  await asyncExpectation(),
]);

module.exports = {
  asyncTest,
};

// @flow
const { assertionExpectations } = require('./src/assertions.test');

const testAll = async () => {
  console.log(await Promise.all(assertionExpectations.map(expectation => expectation.test())));
};

if (require.main === module) {
  testAll();
}
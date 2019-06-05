import { createTestSuite, createTest } from '../src';
import { equal, notEqual, throws, not, safe } from './assertions';

const basicEquality = createTest('basicEquality', () => {
  return [
    notEqual(1, 2),
    equal(1, 1),
    equal(2, 2),
  ];
});

const longWait = createTest('longWait', async () => {
  await new Promise(res => setTimeout(res, 10));
});

const inverseThrow = createTest('inverseThrow', () => {
  return [
    throws(() => { throw new Error('Example Test Error')}),
    not(throws(function wontThrowAnError() { })),
  ];
});

const safeCheck = createTest('safeCheck', () => {
  const object = {};

  return [
    not(safe(() => equals(object.property.wont.exist, null))),
  ];
});

const assertionTestSuite =  createTestSuite([basicEquality, longWait, inverseThrow, safeCheck], 'src/assertions.test.js');

export {
  assertionTestSuite,
};

import { createTestSuite, createTest, equal } from '../src';
import { colorfulReporter } from './reporter';

const reporterReportsAString = createTest('reporterReportsAString', () => {
  return [
    equal(typeof colorfulReporter([]), 'string'),
  ];
});

const reporterTestSuite = createTestSuite([reporterReportsAString], 'src/reporter.test.js');

export {
  reporterTestSuite
};

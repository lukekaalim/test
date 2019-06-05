import { didTestPass } from './lib';
import { colorfulReporter } from './reporter';
import { assertionTestSuite } from './assertions.test';
import { reporterTestSuite } from './reporter.test';

const testPackage = async () => {
  const results = [
    ...await assertionTestSuite.run(),
    ...await reporterTestSuite.run(),
  ];
  const report = colorfulReporter(results);
  process.stdout.write(report + '\n');
  process.exitCode = results.every(didTestPass) ? 0 : 1;
  console.log(`Exiting with code: ${process.exitCode}`);
};
testPackage();
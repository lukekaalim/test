#!/usr/bin/env node

const glob = require('glob').sync;
const clc = require('cli-color');
const esm = require('esm');
const { getGlobalTestPromises } = require('./lib');

const esmRequire = esm(module);

const run = (testGlob) => {
  const localTestingGlob = [process.cwd(), testGlob].join('/');
  console.log(clc.yellow(`Looking for ${localTestingGlob}`));
  
  const testFiles = glob(localTestingGlob)
    .filter(testFile => !testFile.includes('node_modules'));

  console.log(clc.green(`Found ${testFiles.length} tests`));
  testFiles.forEach(testFile => {
    try {
      esmRequire(testFile);
    } catch (error) {
      console.error(clc.red(testFile + ' => ' + error.stack));
    }
  });
  Promise.all(getGlobalTestPromises()).then((testResults) => {
    const successes = testResults.filter(testResult => testResult.type === 'success');
    const failures = testResults.filter(testResult => testResult.type === 'failure');
    const failed = failures.length > 0;

    console.log(clc.bold((failed ? clc.red : clc.green)(`\nAll lk-test Tests => Success: ${successes.length}, Failure: ${failures.length}`)));
    process.exitCode = failed ? 1 : 0;
  });
};

if (require.main === module) {
  const glob = process.argv[2] || '**/*.test.js';
  run(glob);
}

exports.run = run;
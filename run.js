#!/usr/bin/env node

const glob = require('glob').sync;
const clc = require('cli-color');

const run = () => {
  const testingGlob = [process.cwd(), '**/*.test.js'].join('/');
  console.log(clc.yellow(`Looking for ${testingGlob}`));
  
  const testFiles = glob(testingGlob)
    .filter(testFile => !testFile.includes('node_modules'));

  console.log(clc.green(`Found ${testFiles.length} tests`));
  testFiles.map(testFile => {
    try {
      require(testFile)
    } catch (error) {
      console.error(clc.red(testFile + ' => ' + error.stack));
    }
  });
};

if (require.main === module) {
  run();
}

exports.run = run;
#!/usr/bin/env node

const glob = require('glob').sync;
const path = require('path');

const run = async () => {
  const testingGlob = path.resolve(path.dirname(process.argv0), '**/*.test.js');
  const testFiles = glob(testingGlob);
  testFiles.map(testFile => require(testFile));
};

if (require.main === module) {
  run();
}

exports.run = run;
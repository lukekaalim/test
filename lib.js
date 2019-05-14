const path = require('path');
const clc = require('cli-color');

const testAll = async (testFuncs, filename) => {
  const relativePath = path.relative(process.cwd(), filename);
  const failures = [];
  const successes = [];
  await Promise.all(testFuncs.map(async testFunc => {
    try {
      await testFunc();
      successes.push(testFunc.name);
    } catch (error) {
      console.error(clc.red(relativePath + ' => ' + error.stack));
      failures.push(error);
    }
  }));
  console.log(clc.yellow(`${relativePath} => Success: ${successes.length}, Failure: ${failures.length}`));
};

const test = (estFuncName = testFunc.name, testFunc) => testAll([testFunc], [testFuncName]);

exports.test = test;
exports.testAll = testAll;
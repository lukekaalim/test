const path = require('path');
const clc = require('cli-color');

let globalTestPromises = [];
const getGlobalTestPromises = () => globalTestPromises;

const testAll = async (testFuncs, filename) => {
  const relativePath = path.relative(process.cwd(), filename);
  console.log('starting:', clc.blue(testFuncs.map(testFunc => testFunc.name).join(' ')));
  const testPromises = testFuncs.map(async testFunc => {
    try {
      await testFunc();
      return { type: 'success', testName: testFunc.name };
    } catch (error) {
      console.error(clc.yellow(`\n[${relativePath}] ${testFunc.name}()`) + clc.red(`\n${error.stack}`));
      return { type: 'failure', testName: testFunc.name }
    }
  });
  globalTestPromises = globalTestPromises.concat(testPromises);
  const testResults = await Promise.all(testPromises);
  const successes = testResults.filter(testResult => testResult.type === 'success');
  const failures = testResults.filter(testResult => testResult.type === 'failure');
  console.log(clc.yellow(`${relativePath} => Success: ${successes.length}, Failure: ${failures.length}`));
};

const test = (estFuncName = testFunc.name, testFunc) => testAll([testFunc], [testFuncName]);

exports.test = test;
exports.testAll = testAll;
exports.getGlobalTestPromises = getGlobalTestPromises;
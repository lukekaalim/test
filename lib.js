let globalFailures = [];
let globalSuccesses = [];
let isPrintingToConsole = true;

const suppressConsole = () => {
  isPrintingToConsole = false;
};

const getGlobalStats = () => ({
  globalFailures,
  globalSuccesses,
});

const testAll = async (testFuncs, testFuncNames = []) => {
  const failures = [];
  const successes = [];
  const results = await Promise.all(testFuncs.map(async testFunc => {
    try {
      await testFunc();
      successes.push(testFunc.name);
    } catch (error) {
      isPrintingToConsole && console.error(error);
      failures.push(error);
    }
  }));
  globalSuccesses = globalSuccesses.concat(successes);
  globalFailures = globalFailures.concat(failures);
  isPrintingToConsole && console.log(`${__filename}: Success: ${successes.length}, Failure: ${failures.length}`);
};

const test = (estFuncName = testFunc.name, testFunc) => testAll([testFunc], [testFuncName]);

exports.test = test;
exports.testAll = testAll;
// For outputting
exports.suppressConsole = suppressConsole;
exports.getGlobalStats = getGlobalStats;
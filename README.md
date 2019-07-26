# `lk-test`
An alarmingly simple test library, made mostly to my tastes and practical needs.

[![CircleCI](https://circleci.com/gh/lukekaalim/lk-test.svg?style=svg)](https://circleci.com/gh/lukekaalim/lk-test)

[Documentation.md](/docs.md)

## Why
- I like things that aren't complex.
- I starting node programs by running something like `node src/basicMath.test.js` instead of special commands.
- I don't like messing with globals or weird execution state tracking.
- I like not having a lot of dependencies.

## Installation
Install with
```bash
npm i -D lk-test
```
or
```bash
yarn add -D lk-test
```
## Guide
Make some test files.
```bash
src/basicMath.test.js
src/advancedMath.test.js
```
Write some tests, and use `lk-test` to provide the tools.
```javascript
// basicMath.test.js
import { createTest, equal } from 'lk-test';

const additionTest = createTest('1 plus 1 should equal 2', () => [
  equal(1 + 1, 2)
]);

export { additionTest };
```
Add an test entry point.
```bash
src/index.test.js
```
Import and invoke your test.
```javascript
// index.test.js
import { additionTest } from './basicMath.test.js';
import { colorfulReporter } from 'lk-test';

const testMath = async () => {
  const testResult = await additionTest.run();
  const testReport = colorfulReporter(testResult);
  console.log(testReport);
};
testMath();
```
Execute your tests and get some output!
```bash
$ node -r esm src/index.test.js
Ran 1 tests
Pass | 1 plus 1 should equal 2 (1ms)
All tests passed!
```
> ### What is : `node -r esm` ?
> Oh yeah. I like modules, so I use the package https://github.com/standard-things/esm so that they just work inside my code. You can swap it with `--experimental-modules` if you like, or just use `require()` instead of `import` in all your code. Or even transpile your tests using babel before running them! The choice is yours. When node supports modules without the flag, then you don't need to do this.

Make a test suite.

```javascript
// advancedMath.test.js
import { createTest, createTestSuite, equals } from 'lk-test';

const multiplicationTest = createTest('2 times 2 is 4', () => [
  equals(2 * 2, 4)
]);

const subtractionTest = createTest('10 minus 5 is 5', () => [
  equals(10 - 5, 5)
]);

const advancedMathTestSuite = createTestSuite(
  [
    multiplicationTest,
    subtractionTest,
  ],
  'src/advancedMath.test.js',
);

export {
  advancedMathTestSuite
};
```

Add it to your entry point!
```javascript
// index.test.js
import { additionTest } from './basicMath.test.js';
import { advancedMathTestSuite } from './advancedMath.test.js';
import { colorfulReporter } from 'lk-test';

const testMath = async () => {
  const testResults = [
    await additionTest.run(),
    ...await advancedMathTestSuite.run(),
  ];
  const testReport = colorfulReporter(testResults);
  console.log(testReport);
};
testMath();
```
Set the exit code depending on how well the test did.
```javascript
// index.test.js
import { additionTest } from './basicMath.test.js';
import { advancedMathTestSuite } from './advancedMath.test.js';
import { colorfulReporter, didTestPass } from 'lk-test';

const testMath = async () => {
  const testResults = [
    await additionTest.run(),
    ...await advancedMathTestSuite.run(),
  ];
  const testReport = colorfulReporter(testResults);
  console.log(testReport);
  process.exitCode = testResults.every(didTestPass) ? 0 : 1;
  console.log(`Exiting with code: ${process.exitCode}`);
};
testMath();
```
Write some slow/throw/no tests!
```javascript
// slowTests.test.js
import { createTest, equals, throws, not } from 'lk-test';

const slowTest = createTest('slowTest', async () => {
  await new Promise(res => setTimeout(res, 1000));
});

const throwTest = createTest('throwTest', () => [
  throws(function () { throw new Error('Example Test Error'); }),
]);

const noTest = createTest('(the joke is that "slow", "throw" and "no" rhyme, even though the assertion is technically called not)', () => [
  not(equals(10, 11)),
]);

```
Use chai! Or any other error-throwing assertion library!
```javascript
// chai.test.js
import { createTest } from 'lk-test';
import { expect } from 'chai';

const chaiTest = createTest('chaiTest', () => {
  expect(10).to.equal(10);
});

```
# Documentation

## API

### `import { createTest } from 'lk-test';`

```typescript
export const createTest = (
  testName: string,
  testFunc: () => Promise<Array<Assertion> | void>,
) => Test

type Test = {
  execute: () => Promise<TestResult>.
};

type TestResult = {
  name: string,
  assertions: Array<Assertion>,
  duration: number, // ms
};

type Assertion = {
  name: string,
  result: 'pass' | 'fail',
  message: string,
}
```
This function creates a test, which can be invoked to generate Test Results, which are just some metadata and a list of assertions. Assertions are just mostly 'pass' or 'fail', with a name and a message to help debugging.

If a testFunc doesn't return an array, `lk-test` will use the **default assertion**, which simply fails if the testFunc itself throws and error, and passes if it doesn't.


#### `import { createTestSuite } from 'lk-test';`

```typescript
export const createTestSuite = (
  tests: Array<Test>>,
  testSuiteName: string
) => TestSuite;

type TestSuite = {
  execute: () => Promise<Array<TestResult>>,
};
```
This function groups an array of tests together. When you execute a suite, all the tests passed in as an argument execute together, and return their results.

Executing a test though a test suite formats the test name as `${testSuiteName}: ${test.name}`;

#### `import { equal, not, ok, throws } from 'lk-test';`

```typescript
export const equal = <T>(
  a: T,
  b: T,
) => Assertion;
```
Generates a passing assertion if `a` and `b` strict (`===`) equal each other.
```typescript
export const not = (
  a: Assertion,
) => Assertion;
```
Generates a passing assertion `a` is a failing assertion.
```typescript
export const ok = <T>(
  a: T,
) => Assertion;
```
Generates a passing assertion is `a` is truthy.
```typescript
export const throws = <T>(
  a: () => T,
) => Assertion;
```
Generates a passing assertion if `a`, when invoked, doesn't throw an error.

#### `import { colorfulReporter } from 'lk-test';`

```typescript
export const colorfulReporter = <T>(
  results: Array<TestResult>,
) => string;
```
This returns some colored output suitable for terminals.

## What is `${concept}`

### `concept === 'assertion'`
In the specific language of the project, an assertion is a statement on the function of some code. This conflicts with some language used by other projects where 'assertion' is a function to _generate_ a statement, but I feel this is a important distinction.

A chai assertion might be:
```javascript
expect(1).to.equal(2);
```
But an lk-test assertion is:
```javascript
{ name: 'equals', result: 'fail', message: '1 !== 2' };
```

More specifically in the testing language of `lk-test`, and assertion is a _result_, not a _test_.

**Tests** generate **Assertions** which can be **Reported**.

### `concept === 'test'`

A test is a function that will return some assertions on some code. They have names, and in general have the parts:
 1. Assembling Expectations
 2. Executing Test
 3. Verifying Assertions

Notably missing from this section and the test api is any mention of 'setup' or 'teardown' phases. This is a deliberate decision, as I think the test should handle that internally within the execution part

### `concept === 'test suite'`

This is simply sugar over an array of tests. I find it easy to report which file a test belong to, so a test suite is simply a selection of tests that are grouped together, typically by file.

## Complex Testing Guide

### How do I test promises?

```javascript
import { createTest, ok } from 'lk-test';

const promiseTest = createTest('promiseTest', async () => {
  const promise = Promise.resolve('Promise Value');

  const promiseResult = await promise;

  return [ok(promiseResult)];
});
```
### How do I mock imports and requires and properties of objects?

Don't.

Use dependency injection.

```javascript
import { createTest, ok } from 'lk-test';
import { createMyController } from './myController';
import { createMyService } from './myService';

const controllerTest = createTest('controllerTest', async () => {
  const mockGet = async () => JSON.stringify(['an', 'array']);

  const createMyService = createMyService(mockGet);
  const controller = createMyController(createMyService);

  const response = await controller.get('/myServiceResponse');

  return [equals(response, JSON.parse(['an', 'array']))];
});
```
### How do I mock globals?

_Don't_.

Seriously though, this testing library was built just for me, and I do my best to not mess with globals. Even the current time. _Especially_ the current time.

This library is intentionally limiting to try and force myself to find alternative solutions to problems I've normally just short-circuited and used skipped because of the testing tool I was using at the time.

## Testing Styles

### Assertions at the end
```javascript
import { createTest, equals } from 'lk-test';

const assertionsAtTheEnd = createTest('assertionsAtTheEnd', () => {
  return [
    equals(1 + 1, 2),
  ];
});
```

### Assertions anywhere
```javascript
import { createTest, equals } from 'lk-test';

const assertionsAnywhere = createTest('assertionsAnywhere', () => {
  const assertions = [];

  assertions.push(equals(1 + 1, 2));

  return assertions;
});
```
### Throwing assertions
```javascript
import { createTest } from 'lk-test';
import { expect } from 'chai'

const assertionsAnywhere = createTest('assertionsAnywhere', () => {
  expect(1 + 1).to.be.equal(2);
});
```
### Only assertions
```javascript
import { createTest, equals } from 'lk-test';

const assertionsAnywhere = createTest('assertionsAnywhere', () => [
  equals(1 + 1, 2)
]);
```
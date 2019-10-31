# Documentation

[Back to Readme](/README.md)

## All Exports

```javascript
module.exports = {
  // Assertions
  assert,
  createAssertion,
  expect,
  createExpectation,
  // Reporters
  colorReporter,
  booleanReporter,
  emojiReporter,
  unicodeReporter,
  exitCodeReporter,
}

```

## Assertions

### `assert()`, `createAssertion()`
```javascript
assert(
  'assertion description', // string, description of assertion
  true, // boolean representing whether program output matched assertion
) // returns Assertion
```
### `assertion`
```javascript
const assertion = {
  expectationDescription: 'assertion description',// string
  matchedExpectation: true,// boolean,
  childAssertions: [], // Assertion[],
};
```
`assertion.childAssertions` is an array of assertions that this assertion 'depends' on to be valid.

`assertion.matchedExpectation` is a boolean, representing whether the assertion was correct. For assertions created by passing an array to `assert()` instead of a boolean, this value is `true` only if every assertion in the array was also true.


### `expect()`, `createExpectation()`

```javascript
expect(
  'assertion description', // string, description of assertion
  [], // array of assertions to check to see is the expectation is valid
) // returns an Assertion Object
```
## Reporters
### `colorReporter`
```javascript
colorReporter(
  assertion, // the assertion to report on
) // returns a multi-line string displaying the output, decorated with ANSI color escape codes
```
### `booleanReporter`
```javascript
booleanReporter(
  assertion, // the assertion to report on
) // returns a boolean representing if the assertion was valid
```
### `emojiReporter`
```javascript
booleanReporter(
  assertion, // the assertion to report on
) // returns a multi-line string displaying the output, decorated with emoji
```
### `exitCodeReporter`
```javascript
exitCodeReporter(
  assertion, // the assertion to report on
) // returns a 0 if the test passed, or 1 if it failed.
  // Also sets the process.exitCode as a side effect
```
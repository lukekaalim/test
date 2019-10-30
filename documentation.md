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
) // returns an Assertion Object
```

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
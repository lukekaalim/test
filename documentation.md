# Documentation

## Concepts

The basic concept of `@lukekaalim/test` is the idea that all you really want to know is if your program is working as expected. The two keywords this library uses are *expectations* and *assertions*. An _expectation_ is something you can _test_ to create _assertions_ which tell you whether your expectations were met or not.

Ultimatley, this library provides the tools needed to write a program that returns an assertion about your program.

A _reporter_ is simply a tool that tells you important details about the assertions your program generates.

## Core Exports

These are the building blocks for `@lukekaalim/test`. All other tools support these two constructors. Each function has a 'full' name and a 'short' name (seperated by the comma), but they refer to the same core function.

### `assert`, `createAssertion`
```javascript
assert(
  'assertion description', // string, description of assertion
  true, // boolean, whether the assertion is valid for the expectation 
  [], // optional, array of Assertions representing child assertions
) // returns an Assertion
```
This is the building block of all expectation outputs. Your program typically returns a single Assertion, which nests multiple sub-assertions.

### `expect`, `createExpectation`
```javascript
expect(
  async () => asssert('passed', true) // Function that returns an Assertion, or a Promise of an Assertion
) // returns an Expectation
```
This is the core tool used to build a testing program. Run application code in the argument, and then
return an assertion based on its success. Use this function to build more specific expectations,
and then use `expectAll` to put them all under a parent expectation.

## Expectation Exports
### `expectTrue`
```javascript
expectTrue(
  'Math should make sense', // string, description of assertion
  1 + 1 === 2, // boolean, is the test successful
)// returns an Expectation
```
### `expectAll`
```javascript
expectAll(
  'Math should make sense', // string, description of assertion
  [expectTrue('childExpectation', true)] // array, an Array of child expectations
)// returns an Expectation
```
### `expectToThrow`
```javascript
expectAll(
  'Should throw a TypeError', // string, description of assertion
  () => { throw new TypeError() }, // function that should return a promise that rejects, or throw an error. Returning without throwing an error fails the generated assertion.
  TypeError, // optional, a constructor that should be on the errors prototype chain. Fails the assertion if it isnt there
)// returns an Expectation
```

## Reporter Exports
### `colorReporter`
```javascript
colorReporter(
  assertion, // the assertion to report on
)// returns a string
```
### `booleanReporter`
```javascript
booleanReporter(
  assertion, // the assertion to report on
)// returns a boolean representing if the assertion was valid
```
# @lukekaalim/test
[![CircleCI](https://img.shields.io/circleci/build/github/lukekaalim/test)](https://circleci.com/gh/lukekaalim/test)

An alarmingly simple test library, made mostly to my tastes and practical needs.

## Docs
- Raw API Docs: 
[/documentation.md](/documentation.md)
- Guides and Testing Patterns:
[/guides.md](/guides.md)

## Why
- I like things that aren't complex.
- I like starting node programs by running something like `node src/basicMath.test.js` instead of special commands.
- I don't like messing with globals or weird execution state tracking.
- I like not having a lot of dependencies.
- I like tiny API's.
- Current testing tools are less like libraries and more like frameworks; they have a lot of features, and a lot of concerns. I'm a little opinionated, and I like customization.
- I like fast tests.

## What

`@lukekaalim/test` is a small _testing tool_ that allows you to define a set of nested expectations of your program using a basic API, and a method of printing those assertions out in various methods.

This library imposes some definitions:
> A test is a program that is constructed to compare the output of another program with an expected output. A test either asserts **"success"** or **"failure"**, describing whether the output that the other program generated matched the expected output. If the test succeeds, then the program is guaranteed (or _asserted_) to have matched all the expectations.

> An expectation is an action that can be performed to generate an "assertion", which describes if a portion of a programs output matched an predefined rule (or set of rules).

This library helps you build _your_ testing program; it is not a complete testing program in and of itself. This library helps you generate "assertions" once your write your "expectations", and also provides some helpful reporters which turn those expectations into useful things like CLI graphs, booleans, or process exit codes.

## Anti-Pitch

- This library does not isolate tests
  - All tests run simultaneously, in no guaranteed order.
  - There is no protections from globals, singleton, or "require cache" state.
  - Tests can interact with each other if you're not careful
  - A particularly bad test can crash the test runner without a useful warning
- This library doesn't have an easy to use CLI (it doesn't have a CLI at all)
- This library doesn't handle things automatically
  - You have to create boilerplate to import and run your tests
  - You have to create boilerplate to start and report on your tests
  - You have to run a separate code coverage tool
- This library doesn't handle automatic transpilation
  - You have to run your tests though your compiler, or runtime transpiler

## Installation
Install with
```bash
npm i -D @lukekaalim/test
```

## Example

```javascript
// src/math.test.js
import { assert } from '@lukekaalim/test';

export const testMath = () => assert('Math should perform as expected', [
  assert('One should equal one', 1 == 1),
  assert('Two should equal two', 2 == 2),
  assert('One plus one should equal two', 1 + 1 == 2),
]);
```
```javascript
// test.js
import { colorReporter } from '@lukekaalim/test';
import { testMath } from './src/math.test';

const testProgram = async () => {
  const report = colorReporter(testMath());
  console.log(report);
};

testProgram();
```

## Contributing

### Infra
Automated builds are provided by CircleCI

## Authors
Luke Kaalim (luke@kaal.im)
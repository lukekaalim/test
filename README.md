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
## Example

```javascript
// src/math.test.js
import { test, expectTrue } from 'lk-test';

export const testMath = test('Math should perform as expected', async () => [
  expectTrue('One should equal one', 1 == 1),
  expectTrue('Two should equal two', 2 == 2),
  expectTrue('One plus one should equal two', 1 + 1 == 2),
]);
```
```javascript
// test.js
import { recursiveColorReporter } from 'lk-test';
import { testMath } from './src/math.test';

const testProgram = async () => {
  console.log(recurisveColorReporter(await testMath.test()))
};

testProgram();
```

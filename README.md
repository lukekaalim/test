# @lukekaalim/test
An alarmingly simple test library, made mostly to my tastes and practical needs.

[![CircleCI](https://img.shields.io/circleci/build/github/lukekaalim/test)](https://circleci.com/gh/lukekaalim/test)

## Docs
Available at:
[/documentation.md](/documentation.md)

## Why
- I like things that aren't complex.
- I like starting node programs by running something like `node src/basicMath.test.js` instead of special commands.
- I don't like messing with globals or weird execution state tracking.
- I like not having a lot of dependencies.

## Installation
Install with
```bash
npm i -D @lukekaalim/test
```

## Example

```javascript
// src/math.test.js
import { expectAll, expectTrue } from '@lukekaalim/test';

export const testMath = expectAll('Math should perform as expected', [
  expectTrue('One should equal one', 1 == 1),
  expectTrue('Two should equal two', 2 == 2),
  expectTrue('One plus one should equal two', 1 + 1 == 2),
]);
```
```javascript
// test.js
import { colorReporter } from '@lukekaalim/test';
import { testMath } from './src/math.test';

const testProgram = async () => {
  const report = colorReporter(await testMath.test());
  console.log(report);
};

testProgram();
```

## Contributing

### Infra
Automated builds are provided by CircleCI

## Authors
Luke Kaalim (luke@kaal.im)
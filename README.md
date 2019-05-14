# lk-test
An alarmingly simple test runner.

## Why?
Its made for my tastes. Its simple, easy to understand, doesn't get in my way at all.

## How
### Install
```bash
npm i -D lk-test
```
```bash
yarn add -D lk-test
```
### Write
```javascript
const { testAll } = require('lk-test');
const { equals } = require('assert');

const onePlusOneShouldEqualTwo = () => {
  equals(1 + 1, 2);
};

testAll([onePlusOneShouldEqualTwo]);

```
### Run
```bash
npx lk-test
```
This will look for every `**/*.test.js` file it can find in the current directory, and run them.
### Watching
Not included. Use `watch -c` or `make` if you care.
```bash
watch -c npx lk-test
```
(The `-c` is for color)
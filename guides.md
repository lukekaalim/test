# Guides

[Back to Readme](/README.md)

## Contents
 - [Getting Started](#getting-started) 
 - [Test Driven Development](#test-driven-development)
 - [Testing Philosophy](#testing-philosophy)
 - [Practical Testing](#practical-testing)
 - [Integrating With CI](#integrating-with-ci)

## Getting Started
Before we begin: some boilerplate. In your project's root, create `test.js`:

```javascript
// test.js
const { assert, colorReporter } = require('@lukekaalim/test');

const test = () => {
  const assertion = assert('My Testing Program', true);
  const report = colorReporter(assertion);
  console.log(report);
};

test();
```

This is our **test runner**. You can invoke it by running `node test`.
```bash
node test
```
Output should be:
```log
 PASS   My Testing Program
```
Feel free to map this to an `npm script` in your package json
```json
{
  "name": "My Program",
  "devDependencies": {
    "@lukekaalim/test": "^7.0.0"
  },
  "scripts": {
    "test": "node test", // <-- add this
  }
}
```

Now, lets check out some source code. I'm going to pretend our program performs some math operations, since they're simple. Here's our pretend `src/index.js`

```javascript
// src/index.js
const add = (a, b) => {
  return a + b;
};

const multiply = (a, b) => {
  return a * b;
};

const coolMath = {
  add,
  multiply,
};

module.exports = {
  coolMath,
}

```

Now, we have some goals for our **cool math** library:
 - It should be able to add any two numbers together
 - It should be able to multiply any two numbers together

So, lets figure out how we would test that. Off the top of my head, I know that `1 + 1` should equals `2`. Also that `5 + 5 === 10`. I also know a bit of multiplication, `2 * 5 === 10` and `10 * 10 === 100`.

So, from this, I have some expectations about how my library should conform.

> Note here that's it's Infeasible to test every single potential input; there are literally infinite numbers. We instead pick a couple of things that we expect the program to do, so that we roughly cover what we think it's functionality is.

If we organize our expectations hierarchically, it should look something like this:

- Cool Math Library is a library that should do Math Correctly
  - It should be able to add two numbers together
    - It should add `1 + 1` and return `2`
    - It should add `5 + 5` and return `10`
  - It should be able to multiply two numbers together
    - It should multiply `2 * 5` and return `10`
    - It should multiply `10 * 10` and return `100`

Now, we can build a library. Note that the higher assertions are basically "dependant" on the lower ones to be true. If the library can't add `1 + 1` together, then it certainly isn't doing Math Correctly!

Lets make our test file for `src/index.js`. I prefer to keep my tests next to their subjects, since it's less of a journey to import them. Because of that, I've created `src/index.test.js`.

I'm going to make a function that, when I call it, it checks our expectations, and uses `@lukekaalim/test`'s assert to generate the output.

```javascript
// src/index.test.js
const { assert } = require('@lukekaalim/test');
const { coolMath } = require('./index.js');

const expectAddition = () => {
  return assert('It should be able to add two numbers together', [
    assert('1 + 1 should equal 2', coolMath.add(1, 1) === 2),
    assert('5 + 5 should equal 10', coolMath.add(1, 1) === 2),
  ]);
}
const expectMultiplication = () => {
  return assert('It should be able to multiply two numbers together', [
    assert('2 * 5 should equal 10', coolMath.multiply(2, 5) === 10),
    assert('10 * 10 should equal 100', coolMath.multiply(10, 10) === 100),
  ]);
}

module.exports = {
  expectAddition,
  expectMultiplication,
};

```
Perfect! Next step is to connect our tests here to the test runner. Update `test.js` to look like this:

```javascript
// test.js
const { assert, colorReporter } = require('@lukekaalim/test');
const { expectAddition, expectMultiplication } = require('./src/index.test.js');

const test = () => {
  const assertion = assert(
    'Cool Math Library is a library that should do Math Correctly',
    [
      expectAddition(),
      expectMultiplication(),
    ]
  );
  const report = colorReporter(assertion);
  console.log(report);
};

test();
```
Lets invoke our test runner:
```bash
node test
```
And you should see the output:
```log
 PASS  Cool Math Library is a library that should do Math Correctly
 PASS   It should be able to add two numbers together
 PASS    1 + 1 should equal 2
 PASS    5 + 5 should equal 10
 PASS   It should be able to multiply two numbers together
 PASS    2 * 5 should equal 10
 PASS    10 * 10 should equal 100
```
If you alter a test to have an expectation that we _know_ the program can't fulfill (like so):
```javascript
// src/index.test.js
// ... rest of file
const expectMultiplication = () => {
  return assert('It should be able to multiply two numbers together', [
    assert('2 * 5 should equal 10', coolMath.multiply(2, 5) === 10),
    // This used to be 100, but we've changed it to 99, which is wrong
    assert('10 * 10 should equal 99', coolMath.multiply(10, 10) === 99),
  ]);
}
// ... rest of file

```
Then when you run the test runner, you should see:
```log
 FAIL  Cool Math Library is a library that should do Math Correctly
 PASS   It should be able to add two numbers together
 PASS    1 + 1 should equal 2
 PASS    5 + 5 should equal 10
 FAIL   It should be able to multiply two numbers together
 PASS    2 * 5 should equal 10
 FAIL    10 * 10 should equal 100
```

And there you have it! This a very minimal example, but you've got your test program running against your source code, and outputting results to the console.

Take a look at the example code for this guide [here](example/gettingStartedGuide.js).

Consider the next topics now that you've mastered the basics:
 - [Test Driven Development](#test-driven-development)
 - [Testing Philosophy](#testing-philosophy)
 - [Practical Testing](#practical-testing)
 - [Integrating With CI](#integrating-with-ci)

---

Can't find what you were looking for? Consider [contributing](https://github.com/lukekaalim/test/pulls)!
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


// src/index.test.js
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

// test.js
const { assert, colorReporter } = require('..');

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
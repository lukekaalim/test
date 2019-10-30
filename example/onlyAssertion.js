// @flow strict
const { assert, colorReporter, emojiReporter, exitCodeReporter, unicodeReporter } = require('..');

const assertEquality = (a, b) => {
  const aDescription = JSON.stringify(a) || 'The first argument';
  const bDescription = JSON.stringify(b) || 'The second argument';
  if (a === b) {
    return assert(`${aDescription} === ${bDescription}`, true);
  }
  return assert(`${aDescription} !== ${bDescription}`, false);
}

const expectation = () => {
  const result = assert('Some Basic Truths', [
    assert('The world is round', true),
    assert('Mathematics isnt a lie', 1 + 1 === 2),
    assert('I am the greatest developer', [assertEquality('luke', 'greatest')]),
  ]);
  return result;
};

const test = async () => {
  const assertion = await expectation();
  console.log(colorReporter(assertion));
  console.log(emojiReporter(assertion));
  console.log(unicodeReporter(assertion));
  process.exitCode = exitCodeReporter(assertion);
}

test();

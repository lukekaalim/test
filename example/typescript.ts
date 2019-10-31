import { assert, colorReporter } from '..';

const test = () => {
  const assertion =  assert('Math is real', [
    assert('1 + 1 === 2', 1 + 1 === 2),
    assert('2 * 2 === 4', 2 * 2 === 4),
  ]);
  console.log(colorReporter(assertion));
};

test();
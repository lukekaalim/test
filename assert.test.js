const { testAll } = require('./lib');
const { equal, throws, ok } = require('assert');

const equalityWorks = () => {
  equal(1, 1);
};

const throwWorks = () => {
  throws(() => equal(2, 1));
};

const okWorks = () => {
  ok(true);
};

testAll([equalityWorks, throwWorks, okWorks]);

const { testAll } = require('./lib');
const { expect } = require('chai');

const equalityWorks = () => {
  expect(3).to.equal(3);
};

const throwingWorks = () => {
  expect(() => { throw new Error('Expected Failure') }).to.throw('Expected Failure');
};

const realError = () => {
  throw new Error('Raarrggghh!!');
}

testAll([equalityWorks, throwingWorks, realError], __filename);

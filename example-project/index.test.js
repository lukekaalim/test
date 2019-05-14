const { equal } = require('assert');
const { testAll } = require('lk-test');
const { createCave } = require('../example-project');

const shouldFail = () => {
  const cave = createCave();
  equal(cave.echo('Echo!!'), 'Echo!!')
}

const shouldPass = () => {
  const cave = createCave();
  equal(cave.echo('Echo!!'), 'Echo!! but quieter');
}

testAll([shouldFail, shouldPass], __filename);
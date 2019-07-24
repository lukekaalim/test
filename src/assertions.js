// @flow strict
import { createAssertion } from './lib';

const equal = (a, b) => createAssertion('equal', a === b ? 'pass' : 'fail', a === b ? `${a} === ${b}` : `${a} === ${b}`);
const notEqual = (a, b) => createAssertion('notEqual', a !== b ? 'pass' : 'fail', a !== b ? `${a} !== ${b}` : `${a} === ${b}`);
const ok = (a) => createAssertion('ok', a ? 'pass' : 'fail', a ? `${a} is truthy` : `${a} wasn't truthy`);
const throws = (a) => {
  try {
    a();
    return createAssertion('throws', 'fail' , `${a.name} didn't throw an error`);
  } catch (error) {
    return createAssertion('throws', 'pass', `${a.name} threw ${error.name || error.message}`);
  }
}
const not = (a) => createAssertion(`not ${a.name}`, a.result === 'fail' ? 'pass' : 'fail', `Inverse of: ${a.message}`);
const safe = (a) => {
  try {
    return a();
  } catch (error) {
    return createAssertion(`safe function threw ${error.name || error.message}`, 'fail', error.stack);
  }
}

export {
  not,
  equal,
  notEqual,
  ok,
  throws,
  safe,
};

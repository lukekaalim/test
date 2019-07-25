// @flow
const { expectTests, createAssertion } = require('..');

const expectAnything = () => createAssertion('Anything was provided', true, []);
const expectImpossible = () => createAssertion('Impossible was provided', false, []);

const main = async () => {
  const test = expectTests('To verify that expectTests fails when one child fails', async () => [
    expectAnything,
    expectImpossible,
  ]);
  console.log(await test());
};

main();
import flow from 'rollup-plugin-flow-entry';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.js',
  external: [ 'tiny-ansi-colors' ],
  output: [
    {
      file: 'dist/lk-test.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/lk-test.esm.js',
      format: 'esm'
    },
  ],
  plugins: [cleanup(), flow()],
};
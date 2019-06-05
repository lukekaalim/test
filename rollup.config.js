import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
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
  plugins: [resolve(), commonjs()],
};
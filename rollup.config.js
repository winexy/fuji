import ts from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    },
    {
      file: 'dist/index.js',
      format: 'cjs'
    }
  ],
  plugins: [ts({ lib: ['es6'] }), terser()]
};

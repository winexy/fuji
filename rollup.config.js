import ts from "@wessberg/rollup-plugin-ts";
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
  plugins: [
    ts(),
    terser()
  ]
};

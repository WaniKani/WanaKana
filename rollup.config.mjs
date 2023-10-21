import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import pkg from './package.json' assert { type: "json" };
import ts from "rollup-plugin-ts";

const input = ['src/index.ts'];

export default [
  // UMD
  {
    input,
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
      }),
      terser(),
      ts({
        transpiler: "babel"
      }),
    ],
    output: {
      file: `dist/${pkg.name}.min.js`,
      format: 'umd',
      name: 'wanakana',
      esModule: false,
      exports: 'named',
      sourcemap: true,
    },
  },
  // ESM and CJS
  {
    input,
    plugins: [nodeResolve(), ts({
      browserslist: false
    })],
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
  },
];

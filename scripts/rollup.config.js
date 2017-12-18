const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const util = require('./util');
const {
  SOURCE_DIR, OUT_DIR, LIB_DIR, PACKAGE_NAME,
} = util;

export default [
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'es',
      file: `${OUT_DIR}/${LIB_DIR}/${PACKAGE_NAME}.esm.js`,
    },
    plugins: [
      babel({
        exclude: ['**/node_modules/**', '**/__tests__/**'],
      }),
    ],
  },
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'umd',
      file: `${OUT_DIR}/${LIB_DIR}/${PACKAGE_NAME}.js`,
    },
    plugins: [
      babel({
        exclude: ['**/node_modules/**', '**/__tests__/**'],
      }),
      nodeResolve({
        jsnext: true,
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'umd',
      file: `${OUT_DIR}/${LIB_DIR}/${PACKAGE_NAME}.min.js`,
    },
    plugins: [
      babel({
        exclude: ['**/node_modules/**', '**/__tests__/**'],
      }),
      nodeResolve({
        jsnext: true,
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];

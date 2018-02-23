const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const util = require('./util');
const { SOURCE_DIR, OUT_DIR, PACKAGE_NAME } = util;

export default [
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'umd',
      file: `${OUT_DIR}/umd/${PACKAGE_NAME}.js`,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['**/node_modules/**'],
      }),
    ],
  },
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'umd',
      file: `${OUT_DIR}/umd/${PACKAGE_NAME}.min.js`,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['**/node_modules/**'],
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

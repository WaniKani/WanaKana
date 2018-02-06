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
        exclude: ['**/node_modules/**'],
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
      nodeResolve({
        jsnext: true,
      }),
      commonjs(),
      babel({
        exclude: ['**/node_modules/**'],
      }),
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
      sourcemap: true,
    },
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
      commonjs(),
      babel({
        exclude: ['**/node_modules/**'],
      }),
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

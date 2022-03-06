const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('rollup-plugin-terser');
const util = require('./util');
const { SOURCE_DIR, OUT_DIR, PACKAGE_NAME } = util;

export default [
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'cjs',
      file: `${OUT_DIR}/${PACKAGE_NAME}.js`,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            'env',
            {
              modules: false,
              useBuiltIns: 'entry',
              targets: {
                node: '12',
              },
            },
          ],
        ],
      }),
    ],
  },
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
        babelHelpers: 'bundled',
        presets: [
          [
            'env',
            {
              modules: false,
              useBuiltIns: 'entry',
              targets: {
                browsers: ['last 2 versions', '> 1%'],
              },
            },
          ],
        ],
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
        babelHelpers: 'bundled',
        presets: [
          [
            'env',
            {
              modules: false,
              useBuiltIns: 'entry',
              targets: {
                browsers: ['last 2 versions', '> 1%'],
              },
            },
          ],
        ],
      }),
      terser(),
    ],
  },
];
